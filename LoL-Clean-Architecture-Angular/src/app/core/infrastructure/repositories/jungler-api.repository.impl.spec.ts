import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerApiService } from '../services/jungler-api.service';
import { JunglerApiRepositoryImpl } from './jungler-api.repository.impl';

describe('JunglerApiRepositoryImpl', () => {
  let repository: JunglerApiRepositoryImpl;
  let api: jest.Mocked<Pick<JunglerApiService, 'getAll' | 'getById' | 'getByDifficulty'>>;
  const champions: Jungler[] = [];

  beforeEach(() => {
    api = {
      getAll: jest.fn().mockReturnValue(of(champions)),
      getById: jest.fn(),
      getByDifficulty: jest.fn().mockReturnValue(of(champions)),
    };
    TestBed.configureTestingModule({
      providers: [
        JunglerApiRepositoryImpl,
        { provide: JunglerApiService, useValue: api },
      ],
    });
    repository = TestBed.inject(JunglerApiRepositoryImpl);
  });

  it('delegates listing and the optional role to the API adapter', () => {
    repository.getAll('Tanque').subscribe();
    expect(api.getAll).toHaveBeenCalledWith('Tanque');
  });

  it('delegates champion detail by id to the API adapter', () => {
    repository.getById(4);
    expect(api.getById).toHaveBeenCalledWith(4);
  });

  it('delegates difficulty filtering to the API adapter', () => {
    repository.getByDifficulty(3).subscribe();
    expect(api.getByDifficulty).toHaveBeenCalledWith(3);
  });
});
