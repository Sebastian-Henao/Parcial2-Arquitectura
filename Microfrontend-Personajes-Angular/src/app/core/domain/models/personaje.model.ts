export interface Personaje {
    id: number,
    nombre: string,
    alias: string,
    juego: string,
    habilidad: string,
    rol: RolCategoria;
}

export type RolCategoria = 'Vanguardia' | 'Ladron' | 'Jefe' | 'Ilusionista' | 'Explorador'