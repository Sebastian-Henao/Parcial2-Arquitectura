import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mision } from '../../domain/modelos/mision.modelo';
import { RepositorioMisiones } from '../../domain/repositorios/repositorio-misiones';

@Injectable({ providedIn: 'root' })
export class ObtenerMisionPorIdCasoDeUso {
  constructor(private readonly repositorio: RepositorioMisiones) {}

  ejecutar(id: string): Observable<Mision> {
    return this.repositorio.obtenerPorId(id);
  }
}
