import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

export class AddFavoritePersonajeUseCase {
    constructor(private personajeRepository: PersonajeRepository) {}

    execute(personajeId: number): Promise<void> {
        return this.personajeRepository.addFavorite(personajeId);
    }
}