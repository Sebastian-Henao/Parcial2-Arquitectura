import { Router } from "express";
import { PersonajeReposiroyImpl } from "../../repositories/personaje.repository.impl";
import { PersonajeDatasource } from "../../datasources/personaje.datasource";
import { GetAllPersonajesUseCase } from "../../../application/usecases/get-all-personajes.usercase";
import { GetPersonajeByIdUseCase } from "../../../application/usecases/get-personaje-by-id.usecase";
import { GetPersonajesByRoleUseCase } from "../../../application/usecases/get-personajes-by-role.usecase";
import { PersonajesController } from "../controller/personajes.controller";

/**
 * Define los endpoints HTTP relacionados con personajes.
 *
 * @remarks
 * Construye las dependencias de infraestructura y las conecta con los
 * casos de uso y el controlador. Las rutas OpenAPI se documentan junto
 * a cada endpoint.
 */
export class PersonajesRoutes {
    /**
     * Crea el enrutador de personajes y registra sus endpoints.
     *
     * @returns Enrutador Express con las operaciones de personajes.
     */
    static get routes(): Router {
        const router = Router();
        const repository = new PersonajeReposiroyImpl(new PersonajeDatasource());
        const getAllPersonajes = new GetAllPersonajesUseCase(repository);
        const getPersonajesById = new GetPersonajeByIdUseCase(repository);
        const getPersonajesByRole = new GetPersonajesByRoleUseCase(repository);
        const controller = new PersonajesController(getAllPersonajes, getPersonajesById, getPersonajesByRole);
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
            *       201:
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
             * /api/personajes/detail/{id}:
             *   get:
             *     summary: Obtener personaje por ID
             *     tags:
             *       - Personajes
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: integer
             *     responses:
             *       200:
             *         description: Personaje encontrado
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/Personaje'
             *       404:
             *         description: Personaje no encontrado
             */
            router.get("/detail/:id", controller.getPersonajeById);

            router.get("/rol/:rol", controller.getPersonajesByRole);

            return router;


    }

        
}