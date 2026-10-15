import swaggerJsdoc from 'swagger-jsdoc';

export const openApiSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API de la Central de Misiones',
      version: '1.0.0',
      description: 'API para consultar misiones y actualizar su estado.',
    },
    servers: [{ url: 'http://localhost:3003' }],
    paths: {
      '/health': {
        get: {
          summary: 'Verificar el estado de la API',
          responses: {
            '200': {
              description: 'La API está disponible.',
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { estado: { type: 'string' } } },
                },
              },
            },
          },
        },
      },
      '/api/misiones': {
        get: {
          summary: 'Listar todas las misiones',
          responses: {
            '200': {
              description: 'Lista de misiones.',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Mision' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/misiones/{id}': {
        get: {
          summary: 'Consultar misión por identificador',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Misión encontrada.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Mision' },
                },
              },
            },
            '404': { description: 'No se encontró la misión.' },
          },
        },
      },
      '/api/misiones/{id}/estado': {
        patch: {
          summary: 'Actualizar el estado de una misión',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['estado'],
                  properties: {
                    estado: {
                      type: 'string',
                      enum: ['disponible', 'en-curso', 'completada'],
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Misión actualizada.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Mision' },
                },
              },
            },
            '400': { description: 'Estado de misión no válido.' },
            '404': { description: 'No se encontró la misión.' },
          },
        },
      },
    },
    components: {
      schemas: {
        Mision: {
          type: 'object',
          required: ['id', 'titulo', 'resumen', 'ubicacion', 'nivelAmenaza', 'estado', 'equipoAsignado'],
          properties: {
            id: { type: 'string', example: 'mision-1' },
            titulo: { type: 'string' },
            resumen: { type: 'string' },
            ubicacion: { type: 'string' },
            nivelAmenaza: { type: 'integer', minimum: 1, maximum: 5 },
            estado: { type: 'string', enum: ['disponible', 'en-curso', 'completada'] },
            equipoAsignado: { type: 'string', nullable: true },
          },
        },
      },
    },
  },
  apis: [],
});
