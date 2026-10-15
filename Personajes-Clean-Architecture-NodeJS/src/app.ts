import { envs } from "./infraestructure/web/config/envs";
import { AppRoutes } from "./infraestructure/web/routes/routes";
import { Server } from "./infraestructure/web/server";

/**
 * Configura y pone en marcha la aplicación.
 *
 * Usa la configuración de entorno, las rutas HTTP y el servidor
 * de infraestructura para iniciar la API.
 */
function main(): void {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}

/**
 * Punto de entrada ejecutable de la aplicación.
 */
(async () => {
    main();
})();