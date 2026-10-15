import { Personaje, RolCategoria } from "../../domain/models/personaje.model";
import { faker } from '@faker-js/faker';

export class PersonajeDatasource {
    private roles: RolCategoria[] =
    [
        'Vanguardia',
        'Ladron',
        'Jefe',
        'Ilusionista',
        'Explorador'
    ];

    private favoritos: Personaje[] = [];

    async getAll(countPersonajes: number): Promise<Personaje[]> {
        const personajes: Promise<Personaje>[] = [];

        for(let i = 1; i <= countPersonajes; i++) {
            personajes.push(this.generatePersonaje(i));
        }

        return Promise.all(personajes);
    }

    async getById(id: number): Promise<Personaje | null> {
        const personajes = await this.getAll(10);
        return personajes.find(p => p.id === id) || null;
    }

    async addFavorite(personajeId: number): Promise<void> {
        const personaje = await this.getById(personajeId);
        if(personaje) {
            this.favoritos.push(personaje);
        }
    }

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