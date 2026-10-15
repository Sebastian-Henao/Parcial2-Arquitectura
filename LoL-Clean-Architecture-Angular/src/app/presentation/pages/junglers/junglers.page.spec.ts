import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllJunglersUseCase } from '../../../core/application/usecases/get-all-junglers.usecase';
import { GetJunglerByIdUseCase } from '../../../core/application/usecases/get-jungler-by-id.usecase';
import { GetJunglersByDifficultyUseCase } from '../../../core/application/usecases/get-junglers-by-difficulty.usecase';
import { Jungler } from '../../../core/domain/models/jungler.model';
import { JunglersPage } from './junglers.page';

describe('JunglersPage', () => {
  let fixture: ComponentFixture<JunglersPage>;
  let getAll: Pick<GetAllJunglersUseCase, 'execute'>;
  let getById: Pick<GetJunglerByIdUseCase, 'execute'>;
  let getByDifficulty: Pick<GetJunglersByDifficultyUseCase, 'execute'>;
  const champions: Jungler[] = [{
    id: 1,
    name: 'Lee Sin',
    title: 'el Monje Ciego',
    role: 'Luchador',
    difficulty: 2,
    region: 'Ionia',
    damageType: 'Físico',
    description: 'Maestro marcial de Ionia.',
    abilities: ['Q', 'W', 'E', 'R'],
  }];

  beforeEach(async () => {
    getAll = { execute: jest.fn().mockReturnValue(of(champions)) };
    getById = { execute: jest.fn().mockReturnValue(of(champions[0])) };
    getByDifficulty = { execute: jest.fn().mockReturnValue(of(champions)) };
    TestBed.overrideComponent(JunglersPage, {
      set: {
        providers: [
          { provide: GetAllJunglersUseCase, useValue: getAll },
          { provide: GetJunglerByIdUseCase, useValue: getById },
          { provide: GetJunglersByDifficultyUseCase, useValue: getByDifficulty },
        ],
      },
    });
    await TestBed.configureTestingModule({
      imports: [JunglersPage],
    }).compileComponents();
    fixture = TestBed.createComponent(JunglersPage);
  });

  it('loads and displays champions on initialization', () => {
    fixture.detectChanges();
    expect(jest.mocked(getAll.execute)).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Lee Sin');
  });

  it('shows an error with a retry button when loading fails', () => {
    jest.mocked(getAll.execute).mockReturnValue(throwError(() => new Error('offline')));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No fue posible cargar los campeones');
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('filters the list by difficulty and can reset the filter', () => {
    fixture.detectChanges();
    const page = fixture.componentInstance;
    page.selectedDifficulty = '2';
    page.filterByDifficulty();
    expect(jest.mocked(getByDifficulty.execute)).toHaveBeenCalledWith(2);
    page.selectedDifficulty = '';
    page.filterByDifficulty();
    expect(jest.mocked(getAll.execute)).toHaveBeenCalledTimes(2);
  });

  it('loads and closes champion details', () => {
    fixture.detectChanges();
    fixture.componentInstance.showDetails(1);
    fixture.detectChanges();
    expect(jest.mocked(getById.execute)).toHaveBeenCalledWith(1);
    expect(fixture.nativeElement.textContent).toContain('Maestro marcial de Ionia.');
    fixture.componentInstance.selectedJungler = null;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.detail')).toBeNull();
  });

  it('reports an error when detail lookup fails and maps difficulties', () => {
    jest.mocked(getById.execute).mockReturnValue(throwError(() => new Error('offline')));
    fixture.detectChanges();
    const page = fixture.componentInstance;
    page.showDetails(99);
    expect(page.errorMessage).toContain('No fue posible cargar el detalle');
    expect(page.difficultyName(1)).toBe('Baja');
    expect(page.difficultyName(2)).toBe('Moderada');
    expect(page.difficultyName(3)).toBe('Alta');
    expect(page.difficultyName(4)).toBe('Desconocida');
  });
});
