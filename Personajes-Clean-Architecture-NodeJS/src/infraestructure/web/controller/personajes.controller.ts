import { AddFavoritePersonajeUseCase } from "../../../application/usecases/add-personaje-favorite.usecase";
import { GetAllPersonajesUseCase } from "../../../application/usecases/get-all-personajes.usercase";
import { GetPersonajeByIdUseCase } from "../../../application/usecases/get-personaje-by-id.usecase";
import { json, Request, Response } from "express"
import { HandleError } from "../erros/handle.error";

export class PersonajesController {
    constructor(
        private getAllPersonajesUseCase: GetAllPersonajesUseCase,
        private getPersonajeByIdUseCase: GetPersonajeByIdUseCase,
        private addFavoritePersonajeUseCase: AddFavoritePersonajeUseCase
    ) {}

    getAllPersonajes = (req: Request, res: Response): void => {
        const { countPersonajes } = req.params;

        setTimeout(() => {
            this.getAllPersonajesUseCase
            .execute(Number(countPersonajes))
            .then((personajes) => res.status(201).json(personajes))
            .catch((error) => HandleError.error(error, res));
        }, 3000);
    };

    getPersonajeById = (req: Request, res: Response): void => {
        const { id } = req.params;

        setTimeout(() => {
            this.getPersonajeByIdUseCase
            .execute(Number(id))
            .then((personaje) => {
                if(!personaje) {
                    return res.status(404).json({ message: "Personaje no encontrado" });
                }
                res.status(200).json(personaje);
            })
            .catch((error) => HandleError.error(error, res))
        }, 3000)
    }

    addFavoritePersonaje = (req: Request, res: Response): void => {
        const { personajeId } = req.body;

        setTimeout(() => {
            this.addFavoritePersonajeUseCase
            .execute(Number(personajeId))
            .then(() => res.status(201).json({ message: "Personaje añadido a favoritos" }))
            .catch((error) => HandleError.error(error, res));
        });
    }
}