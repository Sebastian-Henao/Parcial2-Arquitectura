import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mision } from '../../domain/modelos/mision.modelo';
import { RepositorioMisiones } from '../../domain/repositorios/repositorio-misiones';

@Injectable({ providedIn: 'root' })
export class ObtenerTodasMisionesCasoDeUso {
  constructor(private readonly repositorio: RepositorioMisiones) {}

  ejecutar(): Observable<Mision[]> {
    return this.repositorio.obtenerTodas();
  }
}
