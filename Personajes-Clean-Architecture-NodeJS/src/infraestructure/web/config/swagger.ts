import swaggerJSDoc from "swagger-jsdoc";

/**
 * Especificación OpenAPI generada a partir de la configuración y anotaciones
 * de rutas y esquemas del proyecto.
 *
 * @see {@link https://swagger.io/specification/}
 */
export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Personajes Server NodeJS',
            version: '1.0.0',
            description: 'Documentacion de la API con Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3002',
            },
        ],
    },
    apis: [
        './src/infraestructure/web/routes/**/*.routes.ts',
        './src/infraestructure/web/config/swagger.schemas.ts',
    ],
});