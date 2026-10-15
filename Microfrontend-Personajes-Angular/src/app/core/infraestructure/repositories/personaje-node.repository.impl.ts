import { inject, Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { firstValueFrom } from 'rxjs';
import { Personaje } from '../../domain/models/personaje.model';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

@Injectable()
export class PersonajeNodeRepositoryImpl extends PersonajeRepository {
  private dataService = inject(DataService);

  getAll(countPersonajes: number): Promise<Personaje[]> {
    return firstValueFrom(this.dataService.getAllPersonajeNode(countPersonajes));
  }

  getById(id: number): Promise<Personaje | null> {
    return firstValueFrom(this.dataService.getPersonajesByIdNode(id));
  }

  addFavorite(personajeId: number): Promise<void> {
    return firstValueFrom(this.dataService.addFavoritePersonajeNode(personajeId));
  }
}
