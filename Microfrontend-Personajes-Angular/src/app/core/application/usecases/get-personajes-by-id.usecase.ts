import { inject, Injectable } from '@angular/core';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Observable } from 'rxjs';
import { Personaje } from '../../domain/models/personaje.model';

@Injectable()
export class GetPersonajesByIdUsecase {
  private personajeRepository = inject(PersonajeRepository);

  execute(id: number): Observable<Personaje | null> {
    return this.personajeRepository.getById(id);
  }
}
