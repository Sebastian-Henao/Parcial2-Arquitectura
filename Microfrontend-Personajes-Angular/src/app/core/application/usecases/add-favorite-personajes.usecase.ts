import { inject, Injectable } from '@angular/core';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Observable } from 'rxjs';

@Injectable()
export class AddFavoritePersonajesUsecase {
  private personajeRepository = inject(PersonajeRepository);
  
  execute(personajeId: number): Observable<void> {
    return this.personajeRepository.addFavorite(personajeId);
  }
}
