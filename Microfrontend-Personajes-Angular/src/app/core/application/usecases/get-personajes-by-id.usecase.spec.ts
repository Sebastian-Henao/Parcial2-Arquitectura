import { GetPersonajesByIdUsecase } from './get-personajes-by-id.usecase';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

describe('GetPersonajesByIdUsecase', () => {
  it('delegates the requested id to the repository', async () => {
    const repository: PersonajeRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(null),
      addFavorite: jest.fn().mockResolvedValue(undefined),
    };
    const useCase = new GetPersonajesByIdUsecase(repository);

    await expect(useCase.execute(3)).resolves.toBeNull();
    expect(repository.getById).toHaveBeenCalledWith(3);
  });
});
