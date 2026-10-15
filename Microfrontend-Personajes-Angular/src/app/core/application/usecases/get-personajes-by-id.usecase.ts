import { PersonajeRepository } from '../../domain/repositories/personaje.repository';
import { Personaje } from '../../domain/models/personaje.model';

/**
 * Caso de uso que busca un personaje por su identificador.
 *
 * Delega la consulta al puerto {@link PersonajeRepository} para mantener
 * la aplicación independiente del mecanismo de acceso a datos.
 */
export class GetPersonajesByIdUsecase {
  /**
   * Crea el caso de uso para buscar personajes por ID.
   *
   * @param personajeRepository Puerto de dominio para acceder a personajes.
   */
  constructor(private readonly personajeRepository: PersonajeRepository) {}

  /**
   * Ejecuta la búsqueda por identificador.
   *
   * @param id Identificador numérico del personaje.
   * @returns Promesa con el personaje encontrado o `null` si no existe.
   */
  execute(id: number): Promise<Personaje | null> {
    return this.personajeRepository.getById(id);
  }
}
