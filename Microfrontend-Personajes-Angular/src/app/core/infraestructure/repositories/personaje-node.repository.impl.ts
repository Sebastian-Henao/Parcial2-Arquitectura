import { inject, Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Personaje } from '../../domain/models/personaje.model';

@Injectable()
export class PersonajeNodeRepositoryImpl {
  private dataService = inject(DataService);

  getAll(countPersonajes: number): Observable<Personaje[]> {
    return this.dataService.getAllPersonajeNode(countPersonajes);
  }

  getById(id: number): Observable<Personaje | null> {
    return this.dataService.getPersonajesByIdNode(id);
  }

  addFavorite(personajeId: number): Observable<void> {
    return this.dataService.addFavoritePersonajeNode(personajeId);
  }
}
