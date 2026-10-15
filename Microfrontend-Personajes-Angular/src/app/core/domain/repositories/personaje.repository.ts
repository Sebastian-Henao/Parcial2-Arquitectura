import { Observable } from "rxjs";
import { Personaje } from "../models/personaje.model";

export abstract class PersonajeRepository {

    abstract getAll(countPersonaje: number): Observable<Personaje[]>;

    abstract getById(id: number): Observable<Personaje | null>;

    abstract addFavorite(personajeId: number): Observable<void>;
}