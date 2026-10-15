import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

/**
 * Caso de uso para obtener personajes según su rol.
 *
 * @remarks
 * Pertenece a la **capa de aplicación** y delega la consulta al contrato
 * {@link PersonajeRepository}, sin depender de detalles de infraestructura.
 *
 * @see {@link PersonajeRepository}
 * @see {@link Personaje}
 */
export class GetPersonajesByRoleUseCase {
    /**
     * Crea una instancia del caso de uso.
     *
     * @param personajeRepository - Repositorio utilizado para buscar
     * personajes por rol.
     */
    constructor(private personajeRepository: PersonajeRepository) {}

    /**
     * Ejecuta la búsqueda de personajes para el rol indicado.
     *
     * @param rol - Rol por el que se filtrarán los personajes.
     * @returns Promesa que resuelve con un arreglo de {@link Personaje}.
     *
     * @example
     * ```ts
     * const useCase = new GetPersonajesByRoleUseCase(personajeRepository);
     * const personajes = await useCase.execute("Vanguardia");
     * ```
     */
    execute(rol: string): Promise<Personaje[]> {
        return this.personajeRepository.getByRole(rol);
    }
}
