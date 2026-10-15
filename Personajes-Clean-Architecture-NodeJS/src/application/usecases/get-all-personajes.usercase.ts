import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

/**
 * Caso de uso para obtener un listado de personajes.
 *
 * @remarks
 * Pertenece a la **capa de aplicación** y coordina la obtención de
 * personajes a través del contrato {@link PersonajeRepository}.
 * No conoce la fuente de datos ni depende de implementaciones concretas.
 *
 * @see {@link PersonajeRepository}
 * @see {@link Personaje}
 */
export class GetAllPersonajesUseCase {
    /**
     * Crea una instancia del caso de uso.
     *
     * @param personajeRepository - Repositorio utilizado para acceder
     * a los personajes.
     */
    constructor(private personajeRepository: PersonajeRepository) {}

    /**
     * Ejecuta la consulta de personajes.
     *
     * @param countPersonajes - Cantidad de personajes solicitada.
     * @returns Promesa que resuelve con un arreglo de {@link Personaje}.
     *
     * @example
     * ```ts
     * const useCase = new GetAllPersonajesUseCase(personajeRepository);
     * const personajes = await useCase.execute(10);
     * ```
     */
    execute(countPersonajes: number): Promise<Personaje[]> {
        return this.personajeRepository.getAll(countPersonajes);
    }
}