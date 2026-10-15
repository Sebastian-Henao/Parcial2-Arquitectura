import { Component, inject, OnInit } from '@angular/core';
import { PersonajesTableComponent } from '../components/personajes-table/personajes-table.component';
import { AlertComponent } from '../components/alert/alert.component';
import { GetAllPersonajesUsecase } from '../../core/application/usecases/get-all-personajes.usecase';
import { GetPersonajesByIdUsecase } from '../../core/application/usecases/get-personajes-by-id.usecase';
import { AddFavoritePersonajesUsecase } from '../../core/application/usecases/add-favorite-personajes.usecase';
import { PersonajeRepository } from '../../core/domain/repositories/personaje.repository';
import { Personaje } from '../../core/domain/models/personaje.model';
import { AlertState, State } from '../interfaces/state.interface';

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
      provide: AddFavoritePersonajesUsecase,
      useFactory: (repository: PersonajeRepository) => new AddFavoritePersonajesUsecase(repository),
      deps: [PersonajeRepository],
    },
  ],
})
export class PersonajesPage implements OnInit {
  personajes: Personaje[] = [];
  state: State = 'init';
  favoriteNotification: { state: AlertState; text: string } | null = null;

  private getAllPersonajesUseCase = inject(GetAllPersonajesUsecase);
  private addFavoritePersonajesUseCase = inject(AddFavoritePersonajesUsecase);

  async ngOnInit(): Promise<void> {
    this.state = 'loading';
    try {
      this.personajes = await this.getAllPersonajesUseCase.execute(10);
      this.state = 'success';
    } catch {
      this.state = 'error';
    }
  }

  async addFavoritePersonaje(personajeId: number): Promise<void> {
    this.favoriteNotification = {
      state: 'loading',
      text: 'Agregando personaje a favoritos...',
    };

    try {
      await this.addFavoritePersonajesUseCase.execute(personajeId);
      this.favoriteNotification = {
        state: 'success',
        text: 'Personaje añadido a favoritos.',
      };
    } catch {
      this.favoriteNotification = {
        state: 'error',
        text: 'No se pudo agregar el personaje a favoritos.',
      };
    }
  }
}
