import { Personaje } from "../core/domain/models/personaje.model";

/**
 * Personajes de ejemplo para escenarios de prueba o demostración local.
 */
export const PERSONAJES_MOCK: Personaje[] = [
    {
        id: 1,
        nombre: 'Loki',
        alias: 'Dios de las mentiras',
        juego: 'Marvel Rivals',
        habilidad: 'Hechicero',
        rol: 'Ilusionista'
    },
    {
        id: 2,
        nombre: 'Nathan Drake',
        alias: 'Nate',
        juego: 'Uncharted',
        habilidad: 'Experto en armas y supervivencia',
        rol: 'Ladron'
    }
];