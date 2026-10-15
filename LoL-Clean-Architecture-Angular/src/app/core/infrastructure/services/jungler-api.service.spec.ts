import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerApiService } from './jungler-api.service';

describe('JunglerApiService', () => {
  let service: JunglerApiService;
  let http: jest.Mocked<Pick<HttpClient, 'get'>>;
  const response: Jungler[] = [{
    id: 1,
    name: 'Lee Sin',
    title: 'el Monje Ciego',
    role: 'Luchador',
    difficulty: 2,
    region: 'Ionia',
    damageType: 'Físico',
    description: 'Maestro marcial.',
    abilities: ['Q', 'W', 'E', 'R'],
  }];

  beforeEach(() => {
    http = { get: jest.fn().mockReturnValue(of(response)) };
    TestBed.configureTestingModule({
      providers: [JunglerApiService, { provide: HttpClient, useValue: http }],
    });
    service = TestBed.inject(JunglerApiService);
  });

  it('loads all junglers from the configured API URL', (done) => {
    service.getAll().subscribe((result) => {
      expect(result).toEqual(response);
      expect(http.get).toHaveBeenCalledWith('http://localhost:3004/api/junglers');
      done();
    });
  });

  it('encodes the optional role in the request URL', () => {
    service.getAll('Asesino y mago').subscribe();
    expect(http.get).toHaveBeenCalledWith('http://localhost:3004/api/junglers?role=Asesino%20y%20mago');
  });

  it('loads a jungler by id', () => {
    service.getById(1).subscribe();
    expect(http.get).toHaveBeenCalledWith('http://localhost:3004/api/junglers/1');
  });

  it('loads junglers by difficulty', () => {
    service.getByDifficulty(2).subscribe();
    expect(http.get).toHaveBeenCalledWith('http://localhost:3004/api/junglers/difficulty/2');
  });
});
