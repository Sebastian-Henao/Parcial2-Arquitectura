import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerRepository } from '../../domain/repositories/jungler.repository';

/** Caso de uso para filtrar los campeones por nivel de dificultad. */
@Injectable()
export class GetJunglersByDifficultyUseCase {
  private readonly repository = inject(JunglerRepository);

  /** Ejecuta la consulta de campeones para la dificultad solicitada. */
  execute(level: number): Observable<Jungler[]> {
    return this.repository.getByDifficulty(level);
  }
}
