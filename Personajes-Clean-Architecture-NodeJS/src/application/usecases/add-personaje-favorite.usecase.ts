import { PersonajeRepository } from "../../domain/repositories/personaje.repository";

/**
 * Caso de uso para añadir un personaje a la lista de favoritos.
 *
 * @remarks
 * Esta clase pertenece a la **capa de aplicación** y coordina
 * la operación de agregar un personaje a favoritos.
 *
 * Depende únicamente del contrato {@link PersonajeRepository}
 * definido en el dominio, sin conocer detalles de infraestructura
 * ni depender de implementaciones concretas.
 *
 * @see {@link PersonajeRepository}
 */
export class AddFavoritePersonajeUseCase {

    /**
     * Crea una instancia del caso de uso.
     *
     * @param personajeRepository - Repositorio utilizado para
     * realizar operaciones con los personajes.
     */
    constructor(private personajeRepository: PersonajeRepository) {}

    /**
     * Ejecuta la operación para añadir un personaje a favoritos.
     *
     * @remarks
     * Delega la operación de persistencia al repositorio de personajes.
     *
     * @param personajeId - Identificador del personaje que se añadirá
     * a favoritos.
     * @returns Promesa que se resuelve cuando termina la operación.
     *
     * @example
     * ```ts
     * const useCase = new AddFavoritePersonajeUseCase(personajeRepository);
     * await useCase.execute(1);
     * ```
     */
    execute(personajeId: number): Promise<void> {
        return this.personajeRepository.addFavorite(personajeId);
    }
}