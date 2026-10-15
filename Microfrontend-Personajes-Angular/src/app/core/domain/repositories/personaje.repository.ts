import { Personaje } from "../models/personaje.model";

export abstract class PersonajeRepository {

    abstract getAll(countPersonaje: number): Promise<Personaje[]>;

    abstract getById(id: number): Promise<Personaje | null>;

    abstract addFavorite(personajeId: number): Promise<void>;
}