/**
 * Representa un personaje disponible en el sistema.
 */
export interface Personaje {
    /** Identificador numérico del personaje. */
    id: number,
    /** Nombre del personaje. */
    nombre: string,
    /** Alias o nombre alternativo del personaje. */
    alias: string,
    /** Juego al que pertenece el personaje. */
    juego: string,
    /** Habilidad distintiva del personaje. */
    habilidad: string,
    /** Categoría de rol asignada al personaje. */
    rol: RolCategoria;
}

/**
 * Categorías de rol permitidas para un personaje.
 */
export type RolCategoria = 'Vanguardia' | 'Ladron' | 'Jefe' | 'Ilusionista' | 'Explorador'