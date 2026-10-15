import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

export class GetPersonajeByIdUseCase {
    constructor(private personajeRepository: PersonajeRepository) {}

    execute(id: number): Promise<Personaje | null> {
        return this.personajeRepository.getById(id);
    }
}