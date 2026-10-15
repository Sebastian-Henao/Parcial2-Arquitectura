import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Personaje } from '../../core/domain/models/personaje.model';
import { PersonajeRepository } from '../../core/domain/repositories/personaje.repository';
import { PersonajesPage } from './personajes.page';

describe('PersonajesPage', () => {
  let component: PersonajesPage;
  let fixture: ComponentFixture<PersonajesPage>;
  let repository: {
    getAll: jest.Mock;
    getById: jest.Mock;
    getByRole: jest.Mock;
  };

  const personaje: Personaje = {
    id: 1,
    nombre: 'Loki',
    alias: 'Dios de las mentiras',
    juego: 'Marvel Rivals',
    habilidad: 'Hechicero',
    rol: 'Ilusionista',
  };

  beforeEach(async () => {
    repository = {
      getAll: jest.fn().mockResolvedValue([personaje]),
      getById: jest.fn().mockResolvedValue(personaje),
      getByRole: jest.fn().mockResolvedValue([personaje]),
    };

    await TestBed.configureTestingModule({
      imports: [PersonajesPage],
      providers: [{ provide: PersonajeRepository, useValue: repository }],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajesPage);
    component = fixture.componentInstance;
  });

  it('creates the page and loads the initial personajes', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(repository.getAll).toHaveBeenCalledWith(10);
    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([personaje]);
    expect(fixture.nativeElement.textContent).toContain('Loki');
  });

  it('sets the error state when the initial request fails', async () => {
    repository.getAll.mockRejectedValueOnce(new Error('network failure'));

    await component.ngOnInit();

    expect(component.state).toBe('error');
  });

  it('rejects an invalid id without requesting the repository', async () => {
    await component.searchById('0');

    expect(component.state).toBe('error');
    expect(component.message).toBe('Ingresa un ID válido.');
    expect(component.personajes).toEqual([]);
    expect(repository.getById).not.toHaveBeenCalled();
  });

  it('displays the character found by id', async () => {
    await component.searchById('1');

    expect(repository.getById).toHaveBeenCalledWith(1);
    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([personaje]);
    expect(component.message).toBe('');
  });

  it('shows a not-found message when the id has no matching character', async () => {
    repository.getById.mockResolvedValueOnce(null);

    await component.searchById('2');

    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([]);
    expect(component.message).toBe('No se encontró un personaje con ese ID.');
  });

  it('shows an error message when searching by id fails', async () => {
    repository.getById.mockRejectedValueOnce(new Error('network failure'));

    await component.searchById('1');

    expect(component.state).toBe('error');
    expect(component.personajes).toEqual([]);
    expect(component.message).toBe('No se pudo buscar el personaje.');
  });

  it('filters characters by role', async () => {
    await component.searchByRole('Ilusionista');

    expect(repository.getByRole).toHaveBeenCalledWith('Ilusionista');
    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([personaje]);
    expect(component.message).toBe('');
  });

  it('shows a message when no characters have the selected role', async () => {
    repository.getByRole.mockResolvedValueOnce([]);

    await component.searchByRole('Jefe');

    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([]);
    expect(component.message).toBe('No hay personajes para ese rol.');
  });

  it('shows an error message when filtering by role fails', async () => {
    repository.getByRole.mockRejectedValueOnce(new Error('network failure'));

    await component.searchByRole('Jefe');

    expect(component.state).toBe('error');
    expect(component.personajes).toEqual([]);
    expect(component.message).toBe('No se pudieron filtrar los personajes por rol.');
  });

  it('clears the message and reloads all characters', async () => {
    component.message = 'Filtro anterior';

    await component.showAll();

    expect(repository.getAll).toHaveBeenCalledWith(10);
    expect(component.message).toBe('');
    expect(component.state).toBe('success');
    expect(component.personajes).toEqual([personaje]);
  });
});
