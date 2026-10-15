import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { Personaje } from '../../domain/models/personaje.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);

  private nodeUrl = `${environments.baseUrlNode}/api`;

  getAllPersonajeNode(countPersonajes: number): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(`${this.nodeUrl}/api/personajes${countPersonajes}`);
  }

  getPersonajesByIdNode(id: number): Observable<Personaje> {
    return this.httpClient.get<Personaje>(`${this.nodeUrl}/api/personajes/detail/${id}`);
  }

  addFavoritePersonajeNode(personajeId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.nodeUrl}/api/personajes/favoritos`, {personajeId});
  }
}
