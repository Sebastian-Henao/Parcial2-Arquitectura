import { Router } from "express";
import { PersonajeReposiroyImpl } from "../../repositories/personaje.repository.impl";
import { PersonajeDatasource } from "../../datasources/personaje.datasource";
import { GetAllPersonajesUseCase } from "../../../application/usecases/get-all-personajes.usercase";
import { AddFavoritePersonajeUseCase } from "../../../application/usecases/add-personaje-favorite.usecase";
import { GetPersonajeByIdUseCase } from "../../../application/usecases/get-personaje-by-id.usecase";
import { PersonajesController } from "../controller/personajes.controller";

export class PersonajesRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = new PersonajeReposiroyImpl(new PersonajeDatasource());
        const getAllPersonajes = new GetAllPersonajesUseCase(repository);
        const getPersonajesById = new GetPersonajeByIdUseCase(repository);
        const addFavoritePersonaje = new AddFavoritePersonajeUseCase(repository);
        const controller = new PersonajesController(getAllPersonajes, getPersonajesById, addFavoritePersonaje);
            /**
            * @openapi
            * /api/personajes/{countPersonajes}:
            *   get:
            *     summary: Obtener listado de personajes
            *     description: Retorna una lista de personajes generados dinámicamente según la cantidad solicitada.
            *     tags:
            *       - Personajes
            *     parameters:
            *       - in: path
            *         name: countPersonajes
            *         required: true
            *         schema:
            *           type: integer
            *           minimum: 1
            *           example: 10
            *         description: Cantidad de personajes a generar
            *     responses:
            *       200:
            *         description: Lista de personajes generados
            *         content:
            *           application/json:
            *             schema:
            *               type: array
            *               items:
            *                 $ref: '#/components/schemas/Personaje'
            *       400:
            *         description: Parámetro inválido
            */

            router.get("/:countPersonajes", controller.getAllPersonajes);
            
            /**
             * @openapi
             * /api/personajes/{id}
             *   get:
             *     summary: Obtener personaje por ID
             *     tags:
             *       - Personajes
             */
            router.get("/detail/:id", controller.getPeronajeById);

            /**
             * @openapi
             * /api/favorites:
             *   post:
             *     summary: Agregar personaje a favoritos
             *     tags:
             *       - Characters
             */

            router.post("/favoritos", controller.addFavoritePersonaje);

            return router;


    }

        
}