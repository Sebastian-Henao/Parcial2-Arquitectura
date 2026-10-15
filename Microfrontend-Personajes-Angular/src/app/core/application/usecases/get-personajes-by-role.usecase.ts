import { Personaje } from '../../domain/models/personaje.model';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

export class GetPersonajesByRoleUsecase {
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  execute(rol: string): Promise<Personaje[]> {
    return this.personajeRepository.getByRole(rol);
  }
}
