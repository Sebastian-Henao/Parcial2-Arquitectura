import { GetAllPersonajesUsecase } from './get-all-personajes.usecase';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

describe('GetAllPersonajesUsecase', () => {
  it('delegates the requested amount to the repository', async () => {
    const repository: PersonajeRepository = {
      getAll: jest.fn().mockResolvedValue([]),
      getById: jest.fn().mockResolvedValue(null),
      getByRole: jest.fn().mockResolvedValue([]),
    };
    const useCase = new GetAllPersonajesUsecase(repository);

    await expect(useCase.execute(10)).resolves.toEqual([]);
    expect(repository.getAll).toHaveBeenCalledWith(10);
  });
});
