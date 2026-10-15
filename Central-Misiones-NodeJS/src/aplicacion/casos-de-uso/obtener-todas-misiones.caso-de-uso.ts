import { Mision } from '../../dominio/entities/mision';
import { RepositorioMisiones } from '../../dominio/repositories/mision.repository';

export class ObtenerTodasMisiones {
  constructor(private readonly misiones: RepositorioMisiones) {}

  ejecutar(): Promise<Mision[]> {
    return this.misiones.obtenerTodas();
  }
}
