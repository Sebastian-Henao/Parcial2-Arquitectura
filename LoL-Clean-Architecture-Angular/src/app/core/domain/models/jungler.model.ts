/**
 * Campeón de jungla recibido desde el microservicio MS-LoL-SPRING.
 */
export interface Jungler {
  /** Identificador único del campeón. */
  id: number;
  /** Nombre público del campeón. */
  name: string;
  /** Título oficial del campeón. */
  title: string;
  /** Clase principal del campeón. */
  role: string;
  /** Dificultad del 1 al 3. */
  difficulty: number;
  /** Región de Runaterra. */
  region: string;
  /** Tipo de daño predominante. */
  damageType: string;
  /** Descripción de su estilo de juego en jungla. */
  description: string;
  /** Habilidades Q, W, E y R. */
  abilities: string[];
}
