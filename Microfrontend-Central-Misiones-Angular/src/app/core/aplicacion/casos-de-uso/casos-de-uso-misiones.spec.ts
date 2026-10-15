import { of } from 'rxjs';
import { ActualizarEstadoMisionCasoDeUso } from './actualizar-estado-mision.caso-de-uso';
import { ObtenerMisionPorIdCasoDeUso } from './obtener-mision-por-id.caso-de-uso';
import { ObtenerTodasMisionesCasoDeUso } from './obtener-todas-misiones.caso-de-uso';
import { Mision } from '../../dominio/modelos/mision.modelo';
import { RepositorioMisiones } from '../../dominio/repositorios/repositorio-misiones';

const mision: Mision = {
  id: 'mision-1',
  titulo: 'Rescate en la ciudad',
  resumen: 'Coordinar la evacuación de la zona.',
  ubicacion: 'Cali, Colombia',
  nivelAmenaza: 3,
  estado: 'disponible',
  equipoAsignado: null,
};

describe('Casos de uso de misiones', () => {
  it('obtiene todas las misiones desde el repositorio', (done) => {
    const repositorio: RepositorioMisiones = {
      obtenerTodas: jest.fn().mockReturnValue(of([mision])),
      obtenerPorId: jest.fn().mockReturnValue(of(mision)),
      actualizarEstado: jest.fn().mockReturnValue(of(mision)),
    };
    const casoDeUso = new ObtenerTodasMisionesCasoDeUso(repositorio);

    casoDeUso.ejecutar().subscribe((resultado) => {
      expect(resultado).toEqual([mision]);
      expect(repositorio.obtenerTodas).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('obtiene una misión por su identificador', (done) => {
    const repositorio: RepositorioMisiones = {
      obtenerTodas: jest.fn().mockReturnValue(of([mision])),
      obtenerPorId: jest.fn().mockReturnValue(of(mision)),
      actualizarEstado: jest.fn().mockReturnValue(of(mision)),
    };
    const casoDeUso = new ObtenerMisionPorIdCasoDeUso(repositorio);

    casoDeUso.ejecutar(mision.id).subscribe((resultado) => {
      expect(resultado).toEqual(mision);
      expect(repositorio.obtenerPorId).toHaveBeenCalledWith(mision.id);
      done();
    });
  });

  it('actualiza el estado de una misión', (done) => {
    const misionActualizada = { ...mision, estado: 'completada' as const };
    const repositorio: RepositorioMisiones = {
      obtenerTodas: jest.fn().mockReturnValue(of([mision])),
      obtenerPorId: jest.fn().mockReturnValue(of(mision)),
      actualizarEstado: jest.fn().mockReturnValue(of(misionActualizada)),
    };
    const casoDeUso = new ActualizarEstadoMisionCasoDeUso(repositorio);

    casoDeUso.ejecutar(mision.id, 'completada').subscribe((resultado) => {
      expect(resultado).toEqual(misionActualizada);
      expect(repositorio.actualizarEstado).toHaveBeenCalledWith(mision.id, 'completada');
      done();
    });
  });
});
