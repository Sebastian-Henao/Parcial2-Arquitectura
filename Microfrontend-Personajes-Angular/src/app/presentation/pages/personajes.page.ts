import { Component, inject, OnInit } from '@angular/core';
import { PersonajesTableComponent } from '../components/personajes-table/personajes-table.component';
import { AlertComponent } from '../components/alert/alert.component';
import { GetAllPersonajesUsecase } from '../../core/application/usecases/get-all-personajes.usecase';
import { GetPersonajesByIdUsecase } from '../../core/application/usecases/get-personajes-by-id.usecase';
import { GetPersonajesByRoleUsecase } from '../../core/application/usecases/get-personajes-by-role.usecase';
import { PersonajeRepository } from '../../core/domain/repositories/personaje.repository';
import { Personaje, RolCategoria } from '../../core/domain/models/personaje.model';
import { PersonajeNodeRepositoryImpl } from '../../core/infraestructure/repositories/personaje-node.repository.impl';
import { State } from '../interfaces/state.interface';

/** Roles disponibles en el selector de filtros de la página. */
const ROLES: RolCategoria[] = ['Vanguardia', 'Ladron', 'Jefe', 'Ilusionista', 'Explorador'];

/**
 * Página de presentación para consultar y filtrar personajes.
 *
 * Coordina los casos de uso y expone el estado necesario para mostrar
 * el catálogo, los resultados de búsqueda y los mensajes de error.
 */
@Component({
  selector: 'app-personajes',
  imports: [PersonajesTableComponent, AlertComponent],
  templateUrl: './personajes.page.html',
  providers: [
    { provide: PersonajeRepository, useClass: PersonajeNodeRepositoryImpl },
    {
      provide: GetAllPersonajesUsecase,
      useFactory: (repository: PersonajeRepository) => new GetAllPersonajesUsecase(repository),
      deps: [PersonajeRepository],
    },
    {
      provide: GetPersonajesByIdUsecase,
      useFactory: (repository: PersonajeRepository) => new GetPersonajesByIdUsecase(repository),
      deps: [PersonajeRepository],
    },
    {
      provide: GetPersonajesByRoleUsecase,
      useFactory: (repository: PersonajeRepository) => new GetPersonajesByRoleUsecase(repository),
      deps: [PersonajeRepository],
    },
  ],
})
export class PersonajesPage implements OnInit {
  /** Personajes que se muestran actualmente. */
  personajes: Personaje[] = [];

  /** Estado de carga y resultado de la vista. */
  state: State = 'init';

  /** Opciones de rol disponibles para filtrar. */
  readonly roles = ROLES;

  /** Mensaje contextual de búsqueda o error para la interfaz. */
  message = '';

  /** Caso de uso para cargar el listado inicial de personajes. */
  private getAllPersonajesUseCase = inject(GetAllPersonajesUsecase);

  /** Caso de uso para buscar un personaje por su ID. */
  private getPersonajesByIdUseCase = inject(GetPersonajesByIdUsecase);

  /** Caso de uso para filtrar personajes por rol. */
  private getPersonajesByRoleUseCase = inject(GetPersonajesByRoleUsecase);

  /**
   * Carga el listado inicial al iniciar la página.
   *
   * @returns Promesa que termina cuando se actualiza el estado de carga.
   */
  async ngOnInit(): Promise<void> {
    this.state = 'loading';
    try {
      this.personajes = await this.getAllPersonajesUseCase.execute(10);
      this.state = 'success';
    } catch {
      this.state = 'error';
    }
  }

  /**
   * Busca un personaje usando el valor ingresado como identificador.
   *
   * @param value Texto ingresado por el usuario.
   * @returns Promesa que termina cuando se actualizan los resultados.
   */
  async searchById(value: string): Promise<void> {
    const id = Number(value);
    if (!Number.isInteger(id) || id < 1) {
      this.state = 'error';
      this.message = 'Ingresa un ID válido.';
      this.personajes = [];
      return;
    }

    this.state = 'loading';
    try {
      const personaje = await this.getPersonajesByIdUseCase.execute(id);
      this.personajes = personaje ? [personaje] : [];
      this.state = 'success';
      this.message = personaje ? '' : 'No se encontró un personaje con ese ID.';
    } catch {
      this.personajes = [];
      this.state = 'error';
      this.message = 'No se pudo buscar el personaje.';
    }
  }

  /**
   * Filtra el listado de personajes por el rol seleccionado.
   *
   * @param rol Categoría de rol que se desea consultar.
   * @returns Promesa que termina cuando se actualizan los resultados.
   */
  async searchByRole(rol: string): Promise<void> {
    this.state = 'loading';
    this.message = '';
    try {
      this.personajes = await this.getPersonajesByRoleUseCase.execute(rol);
      this.state = 'success';
      if (this.personajes.length === 0) {
        this.message = 'No hay personajes para ese rol.';
      }
    } catch {
      this.personajes = [];
      this.state = 'error';
      this.message = 'No se pudieron filtrar los personajes por rol.';
    }
  }

  /**
   * Restaura el listado inicial de personajes.
   *
   * @returns Promesa que termina cuando se recarga el listado.
   */
  async showAll(): Promise<void> {
    this.message = '';
    await this.ngOnInit();
  }
}
