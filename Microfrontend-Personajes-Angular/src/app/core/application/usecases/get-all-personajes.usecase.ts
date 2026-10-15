import { inject, Injectable } from '@angular/core';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Observable } from 'rxjs';
import { Personaje } from '../../domain/models/personaje.model';

@Injectable()
export class GetAllPersonajesUsecase {
  private personajeRepository = inject(PersonajeRepository);

  execute(countPersonajes: number): Observable<Personaje[]> {
    return this.personajeRepository.getAll(countPersonajes);
  }
}
