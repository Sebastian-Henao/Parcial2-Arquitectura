import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Personaje } from '../../domain/models/personaje.model';

/**
 * Caso de uso que obtiene una cantidad determinada de personajes.
 *
 * Delega el acceso a datos al puerto {@link PersonajeRepository}, sin depender
 * de una implementación concreta de infraestructura.
 */
export class GetAllPersonajesUsecase {
  /**
   * Crea el caso de uso para consultar el catálogo.
   *
   * @param personajeRepository Puerto de dominio para acceder a personajes.
   */
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  /**
   * Ejecuta la consulta del catálogo.
   *
   * @param countPersonajes Cantidad de personajes que se desea obtener.
   * @returns Promesa con la lista de personajes recuperada.
   */
  execute(countPersonajes: number): Promise<Personaje[]> {
    return this.personajeRepository.getAll(countPersonajes);
  }
}
