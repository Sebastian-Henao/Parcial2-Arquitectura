import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";
import { PersonajeDatasource } from "../datasources/personaje.datasource";

export class PersonajeReposiroyImpl extends PersonajeRepository {
    constructor(private datasource: PersonajeDatasource) {
        super();
    }

    getAll(countPersonajes: number): Promise<Personaje[]> {
        return this.datasource.getAll(countPersonajes);
    }

    getById(id: number): Promise<Personaje | null> {
        return this.datasource.getById(id);
    }

    addFavorite(personajeId: number): Promise<void> {
        return this.datasource.addFavorite(personajeId);
    }
}