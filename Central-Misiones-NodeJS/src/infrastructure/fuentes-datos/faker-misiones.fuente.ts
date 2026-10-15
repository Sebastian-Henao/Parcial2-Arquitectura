import { faker } from '@faker-js/faker';
import { estadosMision, Mision } from '../../domain/entities/mision';

export class FakerMisionesFuente {
  private readonly misiones: Mision[] = Array.from({ length: 12 }, (_, indice) => ({
    id: `mision-${indice + 1}`,
    titulo: faker.lorem.words({ min: 2, max: 4 }),
    resumen: faker.lorem.sentence(),
    ubicacion: `${faker.location.city()}, ${faker.location.country()}`,
    nivelAmenaza: faker.number.int({ min: 1, max: 5 }) as Mision['nivelAmenaza'],
    estado: estadosMision[indice % estadosMision.length],
    equipoAsignado: null,
  }));

  obtenerTodas(): Mision[] {
    return this.misiones.map((mision) => ({ ...mision }));
  }

  obtenerPorId(id: string): Mision | null {
    const mision = this.misiones.find((elemento) => elemento.id === id);
    return mision ? { ...mision } : null;
  }

  actualizarEstado(id: string, estado: Mision['estado']): Mision | null {
    const mision = this.misiones.find((elemento) => elemento.id === id);
    if (!mision) {
      return null;
    }

    mision.estado = estado;
    return { ...mision };
  }
}
