import { GetAllPersonajesUseCase } from "../../../application/usecases/get-all-personajes.usercase";
import { GetPersonajeByIdUseCase } from "../../../application/usecases/get-personaje-by-id.usecase";
import { GetPersonajesByRoleUseCase } from "../../../application/usecases/get-personajes-by-role.usecase";
import { json, Request, Response } from "express"
import { HandleError } from "../erros/handle.error";

/**
 * Controlador HTTP para las operaciones de personajes.
 *
 * @remarks
 * Traduce solicitudes y respuestas de Express a llamadas a los casos de uso
 * de la aplicación. No implementa la lógica de acceso a datos.
 */
export class PersonajesController {
    /**
     * Crea el controlador con los casos de uso que atenderán las solicitudes.
     *
     * @param getAllPersonajesUseCase - Caso de uso para listar personajes.
     * @param getPersonajeByIdUseCase - Caso de uso para consultar un personaje.
     * @param getPersonajesByRoleUseCase - Caso de uso para filtrar por rol.
     */
    constructor(
        private getAllPersonajesUseCase: GetAllPersonajesUseCase,
        private getPersonajeByIdUseCase: GetPersonajeByIdUseCase,
        private getPersonajesByRoleUseCase: GetPersonajesByRoleUseCase
    ) {}

    /**
     * Atiende la consulta de una cantidad de personajes.
     *
     * @param req - Solicitud Express con `countPersonajes` en los parámetros
     * de ruta.
     * @param res - Respuesta Express donde se envía el listado o un error.
     */
    getAllPersonajes = (req: Request, res: Response): void => {
        const { countPersonajes } = req.params;

        setTimeout(() => {
            this.getAllPersonajesUseCase
            .execute(Number(countPersonajes))
            .then((personajes) => res.status(201).json(personajes))
            .catch((error) => HandleError.error(error, res));
        }, 3000);
    };

    /**
     * Atiende la consulta de un personaje por identificador.
     *
     * @param req - Solicitud Express con `id` en los parámetros de ruta.
     * @param res - Respuesta Express con el personaje, un 404 o un error.
     */
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

    getPersonajesByRole = (req: Request, res: Response): void => {
        const { rol } = req.params;
        if (!rol) {
            res.status(400).json({ message: "El rol es requerido" });
            return;
        }

        setTimeout(() => {
            this.getPersonajesByRoleUseCase
            .execute(rol)
            .then((personajes) => res.status(200).json(personajes))
            .catch((error) => HandleError.error(error, res));
        }, 3000);
    }
}