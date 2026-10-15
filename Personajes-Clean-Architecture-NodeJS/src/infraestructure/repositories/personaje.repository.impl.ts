import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";
import { PersonajeDatasource } from "../datasources/personaje.datasource";

/**
 * Implementación concreta del repositorio de personajes.
 *
 * @remarks
 * Adapta el contrato del dominio {@link PersonajeRepository} a la fuente
 * de datos {@link PersonajeDatasource}.
 *
 * @see {@link PersonajeRepository}
 * @see {@link PersonajeDatasource}
 */
export class PersonajeReposiroyImpl extends PersonajeRepository {
    /**
     * Crea el repositorio con la fuente de datos que utilizará.
     *
     * @param datasource - Fuente de datos de personajes.
     */
    constructor(private datasource: PersonajeDatasource) {
        super();
    }

    /**
     * Delega la obtención de personajes a la fuente de datos.
     *
     * @param countPersonajes - Cantidad de personajes solicitada.
     * @returns Promesa con los personajes obtenidos.
     */
    getAll(countPersonajes: number): Promise<Personaje[]> {
        return this.datasource.getAll(countPersonajes);
    }

    /**
     * Delega la búsqueda por identificador a la fuente de datos.
     *
     * @param id - Identificador del personaje.
     * @returns Promesa con el personaje o `null` si no se encuentra.
     */
    getById(id: number): Promise<Personaje | null> {
        return this.datasource.getById(id);
    }

    getByRole(rol: string): Promise<Personaje[]> {
        return this.datasource.getByRole(rol);
    }
}