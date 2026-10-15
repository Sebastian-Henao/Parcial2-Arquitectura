import { EstadoMision, Mision } from '../../dominio/entities/mision';
import { RepositorioMisiones } from '../../dominio/repositories/mision.repository';
import { FakerMisionesFuente } from '../fuentes-datos/faker-misiones.fuente';

export class FakerMisionesRepositorio implements RepositorioMisiones {
  constructor(private readonly fuente: FakerMisionesFuente) {}

  async obtenerTodas(): Promise<Mision[]> {
    return this.fuente.obtenerTodas();
  }

  async obtenerPorId(id: string): Promise<Mision | null> {
    return this.fuente.obtenerPorId(id);
  }

  async actualizarEstado(id: string, estado: EstadoMision): Promise<Mision | null> {
    return this.fuente.actualizarEstado(id, estado);
  }
}
