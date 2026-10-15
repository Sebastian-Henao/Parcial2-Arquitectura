import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerRepository } from '../../domain/repositories/jungler.repository';

/** Caso de uso para consultar campeones, opcionalmente filtrados por clase. */
@Injectable()
export class GetAllJunglersUseCase {
  private readonly repository = inject(JunglerRepository);

  /** Ejecuta la consulta de listado a través del puerto del dominio. */
  execute(role?: string): Observable<Jungler[]> {
    return this.repository.getAll(role);
  }
}
