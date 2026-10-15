import { GetPersonajesByRoleUsecase } from './get-personajes-by-role.usecase';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Personaje } from '../../domain/models/personaje.model';

describe('GetPersonajesByRoleUsecase', () => {
  it('delegates the requested role to the repository and returns its characters', async () => {
    const personaje: Personaje = {
      id: 1,
      nombre: 'Loki',
      alias: 'Dios de las mentiras',
      juego: 'Marvel Rivals',
      habilidad: 'Hechicero',
      rol: 'Ilusionista',
    };
    const repository: PersonajeRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(null),
      getByRole: jest.fn().mockResolvedValue([personaje]),
    };
    const useCase = new GetPersonajesByRoleUsecase(repository);

    await expect(useCase.execute('Ilusionista')).resolves.toEqual([personaje]);
    expect(repository.getByRole).toHaveBeenCalledWith('Ilusionista');
  });
});
