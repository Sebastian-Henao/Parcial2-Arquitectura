import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

export class GetAllPersonajesUseCase {
    constructor(private personajeRepository: PersonajeRepository) {}

    execute(countPersonajes: number): Promise<Personaje[]> {
        return this.personajeRepository.getAll(countPersonajes);
    }
}