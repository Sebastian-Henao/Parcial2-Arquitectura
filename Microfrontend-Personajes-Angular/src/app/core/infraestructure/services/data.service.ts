import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { Personaje } from '../../domain/models/personaje.model';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);

  private readonly apiUrl = `${environments.baseUrlNode.replace(/\/$/, '')}/api`;

  getAllPersonajeNode(countPersonajes: number): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(`${this.apiUrl}/personajes/${countPersonajes}`);
  }

  getPersonajesByIdNode(id: number): Observable<Personaje | null> {
    return this.httpClient.get<Personaje>(`${this.apiUrl}/personajes/detail/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        error.status === 404 ? of(null) : throwError(() => error),
      ),
    );
  }

  getPersonajesByRoleNode(rol: string): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(
      `${this.apiUrl}/personajes/rol/${encodeURIComponent(rol)}`,
    );
  }
}
