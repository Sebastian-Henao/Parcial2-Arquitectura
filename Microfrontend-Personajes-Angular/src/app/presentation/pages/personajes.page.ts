import { Component, inject, OnInit } from '@angular/core';
import { PersonajesTableComponent } from '../components/personajes-table/personajes-table.component';
import { AlertComponent } from '../components/alert/alert.component';
import { GetAllPersonajesUsecase } from '../../core/application/usecases/get-all-personajes.usecase';
import { GetPersonajesByIdUsecase } from '../../core/application/usecases/get-personajes-by-id.usecase';
import { GetPersonajesByRoleUsecase } from '../../core/application/usecases/get-personajes-by-role.usecase';
import { PersonajeRepository } from '../../core/domain/repositories/personaje.repository';
import { Personaje, RolCategoria } from '../../core/domain/models/personaje.model';
import { State } from '../interfaces/state.interface';

const ROLES: RolCategoria[] = ['Vanguardia', 'Ladron', 'Jefe', 'Ilusionista', 'Explorador'];

@Component({
  selector: 'app-personajes',
  imports: [PersonajesTableComponent, AlertComponent],
  templateUrl: './personajes.page.html',
  providers: [
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
  personajes: Personaje[] = [];
  state: State = 'init';
  readonly roles = ROLES;
  message = '';

  private getAllPersonajesUseCase = inject(GetAllPersonajesUsecase);
  private getPersonajesByIdUseCase = inject(GetPersonajesByIdUsecase);
  private getPersonajesByRoleUseCase = inject(GetPersonajesByRoleUsecase);

  async ngOnInit(): Promise<void> {
    this.state = 'loading';
    try {
      this.personajes = await this.getAllPersonajesUseCase.execute(10);
      this.state = 'success';
    } catch {
      this.state = 'error';
    }
  }

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

  async showAll(): Promise<void> {
    this.message = '';
    await this.ngOnInit();
  }
}
