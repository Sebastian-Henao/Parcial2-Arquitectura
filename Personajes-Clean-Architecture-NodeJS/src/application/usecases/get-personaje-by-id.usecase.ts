import { Personaje } from "../../domain/models/personaje.model";
import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

/**
 * Caso de uso para obtener un personaje por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación** y delega la búsqueda al contrato
 * {@link PersonajeRepository}, sin conocer detalles de infraestructura.
 *
 * @see {@link PersonajeRepository}
 * @see {@link Personaje}
 */
export class GetPersonajeByIdUseCase {
    /**
     * Crea una instancia del caso de uso.
     *
     * @param personajeRepository - Repositorio utilizado para buscar
     * el personaje.
     */
    constructor(private personajeRepository: PersonajeRepository) {}

    /**
     * Ejecuta la búsqueda del personaje.
     *
     * @param id - Identificador del personaje buscado.
     * @returns Promesa con el personaje encontrado o `null` si no existe.
     *
     * @example
     * ```ts
     * const useCase = new GetPersonajeByIdUseCase(personajeRepository);
     * const personaje = await useCase.execute(1);
     * ```
     */
    execute(id: number): Promise<Personaje | null> {
        return this.personajeRepository.getById(id);
    }
}