import swaggerJSDoc from "swagger-jsdoc";

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