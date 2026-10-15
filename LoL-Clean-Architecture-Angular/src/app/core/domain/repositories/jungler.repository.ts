import { Observable } from 'rxjs';
import { Jungler } from '../models/jungler.model';

/**
 * Puerto del dominio para consultar los campeones de jungla.
 */
export abstract class JunglerRepository {
  /** Recupera la lista completa o filtra por clase cuando se indica. */
  abstract getAll(role?: string): Observable<Jungler[]>;

  /** Recupera el detalle de un campeón por su identificador. */
  abstract getById(id: number): Observable<Jungler>;

  /** Recupera los campeones correspondientes a una dificultad. */
  abstract getByDifficulty(level: number): Observable<Jungler[]>;
}
