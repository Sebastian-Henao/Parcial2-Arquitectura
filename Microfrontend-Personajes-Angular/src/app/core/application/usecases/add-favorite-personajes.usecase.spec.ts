import { AddFavoritePersonajesUsecase } from './add-favorite-personajes.usecase';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

describe('AddFavoritePersonajesUsecase', () => {
  it('delegates the requested personaje id to the repository', async () => {
    const repository: PersonajeRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(null),
      addFavorite: jest.fn().mockResolvedValue(undefined),
    };
    const useCase = new AddFavoritePersonajesUsecase(repository);

    await expect(useCase.execute(7)).resolves.toBeUndefined();
    expect(repository.addFavorite).toHaveBeenCalledWith(7);
  });
});
