import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environments } from '../../../../environments/environment';
import { Personaje } from '../../domain/models/personaje.model';
import { catchError, Observable, of, throwError } from 'rxjs';

/**
 * Servicio de infraestructura para las solicitudes HTTP de personajes.
 *
 * Construye las URL del backend y transforma únicamente las respuestas 404
 * de la consulta por ID en un resultado vacío.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  /** Cliente HTTP de Angular usado para comunicarse con el backend. */
  private httpClient = inject(HttpClient);

  /** Prefijo común de las rutas de la API de personajes. */
  private readonly apiUrl = `${environments.baseUrlNode.replace(/\/$/, '')}/api`;

  /**
   * Solicita al backend una cantidad determinada de personajes.
   *
   * @param countPersonajes Cantidad de personajes que se desea consultar.
   * @returns Flujo HTTP que emite la lista de personajes.
   */
  getAllPersonajeNode(countPersonajes: number): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(`${this.apiUrl}/personajes/${countPersonajes}`);
  }

  /**
   * Solicita un personaje por identificador.
   *
   * Una respuesta HTTP 404 se convierte en `null`; los demás errores se propagan.
   *
   * @param id Identificador numérico del personaje.
   * @returns Flujo HTTP con el personaje encontrado o `null`.
   */
  getPersonajesByIdNode(id: number): Observable<Personaje | null> {
    return this.httpClient.get<Personaje>(`${this.apiUrl}/personajes/detail/${id}`).pipe(
      catchError((error: HttpErrorResponse) =>
        error.status === 404 ? of(null) : throwError(() => error),
      ),
    );
  }

  /**
   * Solicita personajes filtrados por categoría de rol.
   *
   * @param rol Categoría de rol que se consulta en la URL.
   * @returns Flujo HTTP que emite la lista de personajes coincidentes.
   */
  getPersonajesByRoleNode(rol: string): Observable<Personaje[]> {
    return this.httpClient.get<Personaje[]>(
      `${this.apiUrl}/personajes/rol/${encodeURIComponent(rol)}`,
    );
  }
}
