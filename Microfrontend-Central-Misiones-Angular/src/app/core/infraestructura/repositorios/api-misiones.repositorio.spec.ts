import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiMisionesRepositorio } from './api-misiones.repositorio';
import { Mision } from '../../dominio/modelos/mision.modelo';

const mision: Mision = {
  id: 'mision-1',
  titulo: 'Rescate en la ciudad',
  resumen: 'Coordinar la evacuación de la zona.',
  ubicacion: 'Cali, Colombia',
  nivelAmenaza: 3,
  estado: 'disponible',
  equipoAsignado: null,
};

describe('ApiMisionesRepositorio', () => {
  let repositorio: ApiMisionesRepositorio;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiMisionesRepositorio],
    });
    repositorio = TestBed.inject(ApiMisionesRepositorio);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('obtiene la lista de misiones desde la API asignada', () => {
    repositorio.obtenerTodas().subscribe((resultado) => expect(resultado).toEqual([mision]));

    const solicitud = http.expectOne('http://localhost:3003/api/misiones');
    expect(solicitud.request.method).toBe('GET');
    solicitud.flush([mision]);
  });

  it('consulta el detalle y codifica el identificador', () => {
    repositorio.obtenerPorId('id/uno').subscribe((resultado) => expect(resultado).toEqual(mision));

    const solicitud = http.expectOne('http://localhost:3003/api/misiones/id%2Funo');
    expect(solicitud.request.method).toBe('GET');
    solicitud.flush(mision);
  });

  it('envía el estado seleccionado para actualizar la misión', () => {
    const actualizada = { ...mision, estado: 'en-curso' as const };
    repositorio.actualizarEstado(mision.id, 'en-curso').subscribe((resultado) => {
      expect(resultado).toEqual(actualizada);
    });

    const solicitud = http.expectOne('http://localhost:3003/api/misiones/mision-1/estado');
    expect(solicitud.request.method).toBe('PATCH');
    expect(solicitud.request.body).toEqual({ estado: 'en-curso' });
    solicitud.flush(actualizada);
  });
});
