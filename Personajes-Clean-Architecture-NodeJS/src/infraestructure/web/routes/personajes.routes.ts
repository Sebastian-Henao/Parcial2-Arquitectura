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
            *     description: Retorna la cantidad solicitada de personajes. El conjunto se conserva en memoria mientras el servidor está activo.
            *     tags:
            *       - Personajes
            *     operationId: getAllPersonajes
            *     parameters:
            *       - in: path
            *         name: countPersonajes
            *         required: true
            *         schema:
            *           type: integer
            *           minimum: 1
            *           example: 10
            *         description: Número de personajes que se desea obtener
            *     responses:
            *       201:
            *         description: Lista de personajes
            *         content:
            *           application/json:
            *             schema:
            *               type: array
            *               items:
            *                 $ref: '#/components/schemas/Personaje'
            */

            router.get("/:countPersonajes", controller.getAllPersonajes);
            
            /**
             * @openapi
             * /api/personajes/detail/{id}:
             *   get:
             *     summary: Obtener personaje por ID
             *     description: Busca un personaje por su identificador.
             *     tags:
             *       - Personajes
             *     operationId: getPersonajeById
             *     parameters:
             *       - in: path
             *         name: id
             *         required: true
             *         schema:
             *           type: integer
             *           minimum: 1
             *         description: Identificador del personaje
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

            /**
             * @openapi
             * /api/personajes/rol/{rol}:
             *   get:
             *     summary: Filtrar personajes por rol
             *     description: Retorna los personajes cuyo rol coincide con el valor indicado.
             *     tags:
             *       - Personajes
             *     operationId: getPersonajesByRole
             *     parameters:
             *       - in: path
             *         name: rol
             *         required: true
             *         description: Categoría de rol por la que se filtran los personajes
             *         schema:
             *           type: string
             *           enum:
             *             - Vanguardia
             *             - Ladron
             *             - Jefe
             *             - Ilusionista
             *             - Explorador
             *           example: Vanguardia
             *     responses:
             *       200:
             *         description: Personajes que coinciden con el rol; puede ser una lista vacía
             *         content:
             *           application/json:
             *             schema:
             *               type: array
             *               items:
             *                 $ref: '#/components/schemas/Personaje'
             *       400:
             *         description: No se indicó el rol
             */
            router.get("/rol/:rol", controller.getPersonajesByRole);

            return router;


    }

        
}