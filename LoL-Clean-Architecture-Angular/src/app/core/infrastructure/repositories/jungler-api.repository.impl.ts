import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerRepository } from '../../domain/repositories/jungler.repository';
import { JunglerApiService } from '../services/jungler-api.service';

/** Implementación del puerto del dominio mediante el adaptador HTTP. */
@Injectable()
export class JunglerApiRepositoryImpl extends JunglerRepository {
  private readonly api = inject(JunglerApiService);

  /** Delega el listado al API del microservicio. */
  getAll(role?: string): Observable<Jungler[]> {
    return this.api.getAll(role);
  }

  /** Delega la consulta de detalle al API del microservicio. */
  getById(id: number): Observable<Jungler> {
    return this.api.getById(id);
  }

  /** Delega el filtro por dificultad al API del microservicio. */
  getByDifficulty(level: number): Observable<Jungler[]> {
    return this.api.getByDifficulty(level);
  }
}
