import { Mision } from '../../domain/entities/mision';
import { RepositorioMisiones } from '../../domain/repositories/mision.repository';

export class ObtenerMisionPorId {
  constructor(private readonly misiones: RepositorioMisiones) {}

  ejecutar(id: string): Promise<Mision | null> {
    return this.misiones.obtenerPorId(id);
  }
}
