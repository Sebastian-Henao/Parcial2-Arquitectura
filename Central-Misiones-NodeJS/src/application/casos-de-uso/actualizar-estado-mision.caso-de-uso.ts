import { EstadoMision, Mision } from '../../domain/entities/mision';
import { RepositorioMisiones } from '../../domain/repositories/mision.repository';

export class ActualizarEstadoMision {
  constructor(private readonly misiones: RepositorioMisiones) {}

  ejecutar(id: string, estado: EstadoMision): Promise<Mision | null> {
    return this.misiones.actualizarEstado(id, estado);
  }
}
