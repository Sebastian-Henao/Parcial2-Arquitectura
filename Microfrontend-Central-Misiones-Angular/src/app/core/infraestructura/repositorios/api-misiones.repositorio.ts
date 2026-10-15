import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoMision, Mision } from '../../dominio/modelos/mision.modelo';
import { RepositorioMisiones } from '../../dominio/repositorios/repositorio-misiones';

const URL_API_MISIONES = 'http://localhost:3003/api/misiones';

@Injectable({ providedIn: 'root' })
export class ApiMisionesRepositorio extends RepositorioMisiones {
  constructor(private readonly http: HttpClient) {
    super();
  }

  obtenerTodas(): Observable<Mision[]> {
    return this.http.get<Mision[]>(URL_API_MISIONES);
  }

  obtenerPorId(id: string): Observable<Mision> {
    return this.http.get<Mision>(`${URL_API_MISIONES}/${encodeURIComponent(id)}`);
  }

  actualizarEstado(id: string, estado: EstadoMision): Observable<Mision> {
    return this.http.patch<Mision>(
      `${URL_API_MISIONES}/${encodeURIComponent(id)}/estado`,
      { estado },
    );
  }
}
