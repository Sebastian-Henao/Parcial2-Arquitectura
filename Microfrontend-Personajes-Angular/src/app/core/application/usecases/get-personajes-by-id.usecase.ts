import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Personaje } from '../../domain/models/personaje.model';

export class GetPersonajesByIdUsecase {
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  execute(id: number): Promise<Personaje | null> {
    return this.personajeRepository.getById(id);
  }
}
