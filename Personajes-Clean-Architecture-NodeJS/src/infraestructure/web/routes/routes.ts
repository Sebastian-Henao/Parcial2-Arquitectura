import { Router } from "express";
import { PersonajesRoutes } from "./personajes.routes";

/**
 * Agrupa y expone las rutas principales de la API.
 */
export class AppRoutes {
    /**
     * Construye el enrutador raíz de la aplicación.
     *
     * @returns Enrutador Express con las rutas de personajes montadas
     * bajo `/api/personajes`.
     */
    static get routes(): Router {
        const router = Router();

        router.use("/api/personajes", PersonajesRoutes.routes);

        return router;
    }
}