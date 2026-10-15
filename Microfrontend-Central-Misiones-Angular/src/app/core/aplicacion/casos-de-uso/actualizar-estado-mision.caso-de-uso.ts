import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoMision, Mision } from '../../domain/modelos/mision.modelo';
import { RepositorioMisiones } from '../../domain/repositorios/repositorio-misiones';

@Injectable({ providedIn: 'root' })
export class ActualizarEstadoMisionCasoDeUso {
  constructor(private readonly repositorio: RepositorioMisiones) {}

  ejecutar(id: string, estado: EstadoMision): Observable<Mision> {
    return this.repositorio.actualizarEstado(id, estado);
  }
}
