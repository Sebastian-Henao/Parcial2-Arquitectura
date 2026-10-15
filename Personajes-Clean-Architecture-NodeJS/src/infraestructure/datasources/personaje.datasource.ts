import { Personaje, RolCategoria } from "../../domain/models/personaje.model";
import { faker } from '@faker-js/faker';

/**
 * Fuente de datos de personajes basada en datos generados con Faker.
 *
 * @remarks
 * Mantiene los favoritos en memoria durante la vida del proceso; no ofrece
 * persistencia entre reinicios.
 *
 * @see {@link Personaje}
 */
export class PersonajeDatasource {
    /** Roles disponibles para asignar a los personajes generados. */
    private roles: RolCategoria[] =
    [
        'Vanguardia',
        'Ladron',
        'Jefe',
        'Ilusionista',
        'Explorador'
    ];

    /** Personajes añadidos a favoritos durante la ejecución actual. */
    private favoritos: Personaje[] = [];

    /**
     * Genera una lista de personajes.
     *
     * @param countPersonajes - Cantidad de personajes que se generará.
     * @returns Promesa con los personajes generados.
     */
    async getAll(countPersonajes: number): Promise<Personaje[]> {
        const personajes: Promise<Personaje>[] = [];

        for(let i = 1; i <= countPersonajes; i++) {
            personajes.push(this.generatePersonaje(i));
        }

        return Promise.all(personajes);
    }

    /**
     * Busca un personaje por su identificador dentro de una lista generada.
     *
     * @remarks
     * Esta fuente genera diez personajes para cada búsqueda; por ello,
     * los datos generados en llamadas distintas no necesariamente coinciden.
     *
     * @param id - Identificador del personaje buscado.
     * @returns Promesa con el personaje encontrado o `null`.
     */
    async getById(id: number): Promise<Personaje | null> {
        const personajes = await this.getAll(10);
        return personajes.find(p => p.id === id) || null;
    }

    /**
     * Añade a favoritos el personaje encontrado con el identificador dado.
     *
     * @remarks
     * Si el personaje no se encuentra, la operación termina sin modificar
     * la lista de favoritos.
     *
     * @param personajeId - Identificador del personaje que se añadirá.
     * @returns Promesa que se resuelve al terminar la operación.
     */
    async addFavorite(personajeId: number): Promise<void> {
        const personaje = await this.getById(personajeId);
        if(personaje) {
            this.favoritos.push(personaje);
        }
    }

    /**
     * Construye un personaje con datos generados aleatoriamente.
     *
     * @param id - Identificador asignado al personaje.
     * @returns Promesa con el personaje generado.
     */
    private generatePersonaje(id: number): Promise<Personaje> {
        return Promise.resolve({
            id,
            nombre: faker.person.fullName(),
            alias: faker.word.noun(),
            juego: faker.company.name(),
            habilidad: faker.commerce.productName(),
            rol: faker.helpers.arrayElement(this.roles),
        });
    }
}