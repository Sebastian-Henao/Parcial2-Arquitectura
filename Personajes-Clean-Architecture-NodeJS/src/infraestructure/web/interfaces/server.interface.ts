import { Router } from "express";

/**
 * Opciones necesarias para configurar el servidor HTTP.
 */
export interface Options {
    /** Puerto TCP donde escuchará el servidor. */
    port: number;
    /** Ruta de la carpeta con los recursos estáticos públicos. */
    publicPath: string;
    /** Enrutador Express con las rutas de la aplicación. */
    routes: Router;
}