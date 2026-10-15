import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Jungler } from '../../domain/models/jungler.model';
import { JunglerRepository } from '../../domain/repositories/jungler.repository';
import { GetAllJunglersUseCase } from './get-all-junglers.usecase';
import { GetJunglerByIdUseCase } from './get-jungler-by-id.usecase';
import { GetJunglersByDifficultyUseCase } from './get-junglers-by-difficulty.usecase';

describe('Jungler use cases', () => {
  let getAll: GetAllJunglersUseCase;
  let getById: GetJunglerByIdUseCase;
  let getByDifficulty: GetJunglersByDifficultyUseCase;
  let repository: jest.Mocked<Pick<JunglerRepository, 'getAll' | 'getById' | 'getByDifficulty'>>;
  const champion: Jungler = {
    id: 1,
    name: 'Lee Sin',
    title: 'el Monje Ciego',
    role: 'Luchador',
    difficulty: 2,
    region: 'Ionia',
    damageType: 'Físico',
    description: 'Maestro marcial.',
    abilities: ['Q', 'W', 'E', 'R'],
  };

  beforeEach(() => {
    repository = {
      getAll: jest.fn().mockReturnValue(of([champion])),
      getById: jest.fn().mockReturnValue(of(champion)),
      getByDifficulty: jest.fn().mockReturnValue(of([champion])),
    };
    TestBed.configureTestingModule({
      providers: [
        GetAllJunglersUseCase,
        GetJunglerByIdUseCase,
        GetJunglersByDifficultyUseCase,
        { provide: JunglerRepository, useValue: repository },
      ],
    });
    getAll = TestBed.inject(GetAllJunglersUseCase);
    getById = TestBed.inject(GetJunglerByIdUseCase);
    getByDifficulty = TestBed.inject(GetJunglersByDifficultyUseCase);
  });

  it('requests all champions with an optional role', () => {
    getAll.execute('Luchador').subscribe();
    expect(repository.getAll).toHaveBeenCalledWith('Luchador');
  });

  it('requests a champion by id', () => {
    getById.execute(1).subscribe();
    expect(repository.getById).toHaveBeenCalledWith(1);
  });

  it('requests champions by difficulty', () => {
    getByDifficulty.execute(2).subscribe();
    expect(repository.getByDifficulty).toHaveBeenCalledWith(2);
  });
});
