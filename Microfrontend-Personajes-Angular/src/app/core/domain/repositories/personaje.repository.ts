import { Personaje } from "../models/personaje.model";

/**
 * Puerto de dominio para consultar personajes.
 *
 * Define el contrato que implementan los adaptadores de acceso a datos,
 * manteniendo los casos de uso independientes de tecnologías concretas.
 */
export abstract class PersonajeRepository {

    /**
     * Obtiene una cantidad limitada de personajes.
     *
     * @param countPersonaje Cantidad de personajes solicitada.
     * @returns Promesa con los personajes encontrados.
     */
    abstract getAll(countPersonaje: number): Promise<Personaje[]>;

    /**
     * Busca un personaje por su identificador.
     *
     * @param id Identificador numérico del personaje.
     * @returns Promesa con el personaje o `null` si no existe.
     */
    abstract getById(id: number): Promise<Personaje | null>;

    /**
     * Filtra los personajes por categoría de rol.
     *
     * @param rol Nombre del rol por el que se desea filtrar.
     * @returns Promesa con los personajes que coinciden con el rol.
     */
    abstract getByRole(rol: string): Promise<Personaje[]>;
}