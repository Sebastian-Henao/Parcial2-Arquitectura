import { envs } from "./infraestructure/web/config/envs";
import { AppRoutes } from "./infraestructure/web/routes/routes";
import { Server } from "./infraestructure/web/server";

function main(): void {
    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
}

(async () => {
    main();
})();