import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Jungler } from '../../domain/models/jungler.model';

/** Adaptador HTTP responsable de comunicarse con el microservicio Spring Boot. */
@Injectable({ providedIn: 'root' })
export class JunglerApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/junglers`;

  /** Solicita el listado completo o filtrado por clase al microservicio. */
  getAll(role?: string): Observable<Jungler[]> {
    const url = role ? `${this.apiUrl}?role=${encodeURIComponent(role)}` : this.apiUrl;
    return this.http.get<Jungler[]>(url);
  }

  /** Solicita el detalle de un campeón por identificador. */
  getById(id: number): Observable<Jungler> {
    return this.http.get<Jungler>(`${this.apiUrl}/${id}`);
  }

  /** Solicita el listado filtrado por nivel de dificultad. */
  getByDifficulty(level: number): Observable<Jungler[]> {
    return this.http.get<Jungler[]>(`${this.apiUrl}/difficulty/${level}`);
  }
}
