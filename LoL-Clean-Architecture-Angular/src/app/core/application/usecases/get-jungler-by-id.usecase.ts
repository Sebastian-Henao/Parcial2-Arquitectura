import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerRepository } from '../../domain/repositories/jungler.repository';

/** Caso de uso para obtener el detalle de un campeón. */
@Injectable()
export class GetJunglerByIdUseCase {
  private readonly repository = inject(JunglerRepository);

  /** Ejecuta la consulta de detalle por identificador. */
  execute(id: number): Observable<Jungler> {
    return this.repository.getById(id);
  }
}
