import { AddFavoritePersonajeUseCase } from "../../../application/usecases/add-personaje-favorite.usecase";
import { GetAllPersonajesUseCase } from "../../../application/usecases/get-all-personajes.usercase";
import { GetPersonajeByIdUseCase } from "../../../application/usecases/get-personaje-by-id.usecase";
import { Request, Response } from "express"
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
}