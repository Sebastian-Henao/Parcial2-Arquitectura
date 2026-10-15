import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActualizarEstadoMisionCasoDeUso } from '../../../core/aplicacion/casos-de-uso/actualizar-estado-mision.caso-de-uso';
import { ObtenerMisionPorIdCasoDeUso } from '../../../core/aplicacion/casos-de-uso/obtener-mision-por-id.caso-de-uso';
import { ObtenerTodasMisionesCasoDeUso } from '../../../core/aplicacion/casos-de-uso/obtener-todas-misiones.caso-de-uso';
import { Mision } from '../../../core/dominio/modelos/mision.modelo';
import { PaginaCentralMisiones } from './central-misiones.pagina';

const mision: Mision = {
  id: 'mision-1',
  titulo: 'Rescate en la ciudad',
  resumen: 'Coordinar la evacuación de la zona.',
  ubicacion: 'Cali, Colombia',
  nivelAmenaza: 3,
  estado: 'disponible',
  equipoAsignado: null,
};

describe('PaginaCentralMisiones', () => {
  let obtenerTodas: { ejecutar: jest.Mock };
  let obtenerPorId: { ejecutar: jest.Mock };
  let actualizarEstado: { ejecutar: jest.Mock };

  beforeEach(async () => {
    obtenerTodas = { ejecutar: jest.fn().mockReturnValue(of([mision])) };
    obtenerPorId = { ejecutar: jest.fn().mockReturnValue(of(mision)) };
    actualizarEstado = {
      ejecutar: jest.fn().mockReturnValue(of({ ...mision, estado: 'completada' })),
    };

    await TestBed.configureTestingModule({
      imports: [PaginaCentralMisiones],
      providers: [
        { provide: ObtenerTodasMisionesCasoDeUso, useValue: obtenerTodas },
        { provide: ObtenerMisionPorIdCasoDeUso, useValue: obtenerPorId },
        { provide: ActualizarEstadoMisionCasoDeUso, useValue: actualizarEstado },
      ],
    }).compileComponents();
  });

  it('carga y muestra misiones al iniciar', () => {
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    expect(obtenerTodas.ejecutar).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.textContent).toContain(mision.titulo);
    expect(fixture.componentInstance.cargando()).toBe(false);
  });

  it('muestra un mensaje cuando falla la carga de misiones', () => {
    obtenerTodas.ejecutar.mockReturnValue(throwError(() => new Error('sin conexión')));
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    expect(fixture.componentInstance.mensaje()).toContain('No fue posible cargar');
    expect(fixture.componentInstance.cargando()).toBe(false);
  });

  it('consulta el detalle y copia el estado actual', () => {
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    fixture.componentInstance.consultarMision(mision.id);

    expect(obtenerPorId.ejecutar).toHaveBeenCalledWith(mision.id);
    expect(fixture.componentInstance.misionSeleccionada()).toEqual(mision);
    expect(fixture.componentInstance.estadoSeleccionado()).toBe(mision.estado);
  });

  it('muestra un mensaje cuando falla la consulta del detalle', () => {
    obtenerPorId.ejecutar.mockReturnValue(throwError(() => new Error('sin conexión')));
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    fixture.componentInstance.consultarMision(mision.id);

    expect(fixture.componentInstance.mensaje()).toContain('No fue posible consultar');
  });

  it('acepta estados válidos y descarta valores inválidos', () => {
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    fixture.componentInstance.cambiarEstado('en-curso');
    expect(fixture.componentInstance.estadoSeleccionado()).toBe('en-curso');

    fixture.componentInstance.cambiarEstado('desconocido');
    expect(fixture.componentInstance.estadoSeleccionado()).toBe('en-curso');
  });

  it('no intenta guardar si no se ha seleccionado una misión', () => {
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();

    fixture.componentInstance.guardarEstado();

    expect(actualizarEstado.ejecutar).not.toHaveBeenCalled();
  });

  it('guarda el estado y actualiza la misión en la lista', () => {
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();
    const otraMision: Mision = { ...mision, id: 'mision-2', titulo: 'Otra misión' };
    fixture.componentInstance.misiones.set([mision, otraMision]);
    fixture.componentInstance.misionSeleccionada.set(mision);
    fixture.componentInstance.cambiarEstado('completada');

    fixture.componentInstance.guardarEstado();

    expect(actualizarEstado.ejecutar).toHaveBeenCalledWith(mision.id, 'completada');
    expect(fixture.componentInstance.misionSeleccionada()?.estado).toBe('completada');
    expect(fixture.componentInstance.misiones()[0].estado).toBe('completada');
    expect(fixture.componentInstance.misiones()[1]).toEqual(otraMision);
    expect(fixture.componentInstance.mensaje()).toContain('actualizado');
  });

  it('muestra un mensaje cuando falla la actualización del estado', () => {
    actualizarEstado.ejecutar.mockReturnValue(throwError(() => new Error('sin conexión')));
    const fixture = TestBed.createComponent(PaginaCentralMisiones);
    fixture.detectChanges();
    fixture.componentInstance.misionSeleccionada.set(mision);

    fixture.componentInstance.guardarEstado();

    expect(fixture.componentInstance.mensaje()).toContain('No fue posible actualizar');
  });
});
