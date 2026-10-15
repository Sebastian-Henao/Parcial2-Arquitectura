import { Personaje } from '../../domain/models/personaje.model';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

/**
 * Caso de uso que filtra personajes por categoría de rol.
 *
 * Delega la consulta al puerto {@link PersonajeRepository} sin conocer
 * la implementación de infraestructura que obtiene los datos.
 */
export class GetPersonajesByRoleUsecase {
  /**
   * Crea el caso de uso para filtrar personajes por rol.
   *
   * @param personajeRepository Puerto de dominio para acceder a personajes.
   */
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  /**
   * Ejecuta el filtro por rol.
   *
   * @param rol Categoría de rol solicitada.
   * @returns Promesa con los personajes que coinciden con el rol.
   */
  execute(rol: string): Promise<Personaje[]> {
    return this.personajeRepository.getByRole(rol);
  }
}
