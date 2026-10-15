import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

export class AddFavoritePersonajesUsecase {
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  execute(personajeId: number): Promise<void> {
    return this.personajeRepository.addFavorite(personajeId);
  }
}
