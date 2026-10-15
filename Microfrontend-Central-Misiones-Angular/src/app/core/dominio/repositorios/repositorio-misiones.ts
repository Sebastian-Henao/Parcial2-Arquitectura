import { Observable } from 'rxjs';
import { EstadoMision, Mision } from '../modelos/mision.modelo';

export abstract class RepositorioMisiones {
  abstract obtenerTodas(): Observable<Mision[]>;
  abstract obtenerPorId(id: string): Observable<Mision>;
  abstract actualizarEstado(id: string, estado: EstadoMision): Observable<Mision>;
}
