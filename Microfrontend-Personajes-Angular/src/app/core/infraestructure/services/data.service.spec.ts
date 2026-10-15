import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { environments } from '../../../../environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('requests the requested number of personajes from the API', () => {
    service.getAllPersonajeNode(10).subscribe();

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/10`,
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('requests a personaje by id from the API', () => {
    service.getPersonajesByIdNode(4).subscribe();

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/detail/4`,
    );
    expect(request.request.method).toBe('GET');
    request.flush({
      id: 4,
      nombre: 'Nombre',
      alias: 'Alias',
      juego: 'Juego',
      habilidad: 'Habilidad',
      rol: 'Vanguardia',
    });
  });

  it('emits null when a personaje id is not found', () => {
    let result: unknown = 'not-emitted';

    service.getPersonajesByIdNode(404).subscribe((personaje) => {
      result = personaje;
    });

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/detail/404`,
    );
    request.flush(null, { status: 404, statusText: 'Not Found' });

    expect(result).toBeNull();
  });

  it('propagates errors other than not found when searching by id', () => {
    let receivedError: unknown;

    service.getPersonajesByIdNode(4).subscribe({
      error: (error: unknown) => {
        receivedError = error;
      },
    });

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/detail/4`,
    );
    request.flush('server error', { status: 500, statusText: 'Server Error' });

    expect(receivedError).toBeInstanceOf(HttpErrorResponse);
  });

  it('requests personajes by an encoded role from the API', () => {
    service.getPersonajesByRoleNode('Rol Especial').subscribe();

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/rol/Rol%20Especial`,
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
