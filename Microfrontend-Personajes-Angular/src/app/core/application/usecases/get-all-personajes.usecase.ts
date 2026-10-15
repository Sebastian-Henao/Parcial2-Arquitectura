import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Personaje } from '../../domain/models/personaje.model';

export class GetAllPersonajesUsecase {
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  execute(countPersonajes: number): Promise<Personaje[]> {
    return this.personajeRepository.getAll(countPersonajes);
  }
}
