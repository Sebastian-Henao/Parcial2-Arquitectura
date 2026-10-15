import { Personaje, RolCategoria } from "../../domain/models/personaje.model";
import { faker } from '@faker-js/faker';

/**
 * Fuente de datos de personajes basada en datos generados con Faker.
 *
 * @remarks
 * Conserva los personajes generados en memoria durante la vida del proceso;
 * no ofrece persistencia entre reinicios.
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

    private personajes: Personaje[] = [];

    /**
     * Genera una lista de personajes.
     *
     * @param countPersonajes - Cantidad de personajes que se generará.
     * @returns Promesa con los personajes generados.
     */
    async getAll(countPersonajes: number): Promise<Personaje[]> {
        while (this.personajes.length < countPersonajes) {
            this.personajes.push(this.generatePersonaje(this.personajes.length + 1));
        }
        return this.personajes.slice(0, countPersonajes);
    }

    /**
     * Busca un personaje por su identificador dentro de una lista generada.
     *
     * @remarks
     * La búsqueda usa la misma colección en memoria que `getAll`.
     *
     * @param id - Identificador del personaje buscado.
     * @returns Promesa con el personaje encontrado o `null`.
     */
    async getById(id: number): Promise<Personaje | null> {
        await this.getAll(Math.max(10, this.personajes.length));
        return this.personajes.find(personaje => personaje.id === id) || null;
    }

    async getByRole(rol: string): Promise<Personaje[]> {
        await this.getAll(Math.max(10, this.personajes.length));
        return this.personajes.filter(personaje => personaje.rol === rol);
    }

    /**
     * Construye un personaje con datos generados aleatoriamente.
     *
     * @param id - Identificador asignado al personaje.
     * @returns El personaje generado.
     */
    private generatePersonaje(id: number): Personaje {
        return {
            id,
            nombre: faker.person.fullName(),
            alias: faker.word.noun(),
            juego: faker.company.name(),
            habilidad: faker.commerce.productName(),
            rol: faker.helpers.arrayElement(this.roles),
        };
    }
}