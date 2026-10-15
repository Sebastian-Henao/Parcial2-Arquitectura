/**
 * Representa un personaje disponible en el catálogo.
 */
export interface Personaje {
    /** Identificador numérico único del personaje. */
    id: number,
    /** Nombre del personaje. */
    nombre: string,
    /** Nombre alternativo o apelativo del personaje. */
    alias: string,
    /** Videojuego al que pertenece el personaje. */
    juego: string,
    /** Descripción breve de la habilidad del personaje. */
    habilidad: string,
    /** Categoría de rol que desempeña el personaje. */
    rol: RolCategoria;
}

/**
 * Categorías de rol admitidas por el catálogo de personajes.
 */
export type RolCategoria = 'Vanguardia' | 'Ladron' | 'Jefe' | 'Ilusionista' | 'Explorador';