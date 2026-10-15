import { EstadoMision, Mision } from '../entities/mision';

export interface RepositorioMisiones {
  obtenerTodas(): Promise<Mision[]>;
  obtenerPorId(id: string): Promise<Mision | null>;
  actualizarEstado(id: string, estado: EstadoMision): Promise<Mision | null>;
}
