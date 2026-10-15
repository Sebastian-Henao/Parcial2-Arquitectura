import { TestBed } from '@angular/core/testing';
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

  it('posts the personaje id to the favorites endpoint', () => {
    service.addFavoritePersonajeNode(6).subscribe();

    const request = httpTestingController.expectOne(
      `${environments.baseUrlNode}/api/personajes/favoritos`,
    );
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ personajeId: 6 });
    request.flush({ message: 'Personaje añadido a favoritos' });
  });
});
