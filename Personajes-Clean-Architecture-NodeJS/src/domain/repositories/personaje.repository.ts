import { Personaje } from "../models/personaje.model";

/**
 * Contrato de acceso a los datos de personajes.
 *
 * @remarks
 * Pertenece al dominio y define las operaciones que los casos de uso
 * necesitan, sin acoplarse a una fuente de datos concreta.
 *
 * @see {@link Personaje}
 */
export abstract class PersonajeRepository {
    /**
     * Obtiene una cantidad de personajes.
     *
     * @param countPersonaje - Cantidad de personajes solicitada.
     * @returns Promesa con los personajes obtenidos.
     */
    abstract getAll(countPersonaje: number): Promise<Personaje[]>;

    /**
     * Busca un personaje por su identificador.
     *
     * @param id - Identificador del personaje.
     * @returns Promesa con el personaje o `null` si no existe.
     */
    abstract getById(id: number): Promise<Personaje | null>;

    abstract getByRole(rol: string): Promise<Personaje[]>;
}