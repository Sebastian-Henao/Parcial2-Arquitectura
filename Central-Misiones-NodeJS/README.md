# API Central de Misiones

API REST Node.js + TypeScript para el microfrontend Central de Misiones. Aplica Arquitectura
Limpia y utiliza Faker como fuente de datos en memoria; los cambios de estado se conservan
hasta que se reinicia el proceso.

## Requisitos y ejecución

- Node.js 20.19 o superior
- npm

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

La API escucha en `http://localhost:3003`. Para compilar y ejecutar la versión compilada:

```powershell
npm run build
npm start
```

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/health` | Estado de la API |
| GET | `/api/misiones` | Lista las misiones |
| GET | `/api/misiones/:id` | Consulta una misión |
| PATCH | `/api/misiones/:id/estado` | Actualiza el estado de una misión |
| GET | `/api/docs` | Swagger UI |

Los estados válidos son `disponible`, `en-curso` y `completada`. El endpoint PATCH recibe
`{ "estado": "en-curso" }`.

## Capas de Arquitectura Limpia

- `src/dominio`: entidad de misión y contrato del repositorio.
- `src/aplicacion/casos-de-uso`: listar, consultar por ID y actualizar estado.
- `src/infraestructura`: fuente Faker, repositorio, controladores, rutas y Swagger.
- `src/main.ts`: composición de dependencias y arranque HTTP.

La configuración permite solicitudes desde el host `http://localhost:4200` y el MFE
`http://localhost:4003`. Se puede ajustar con `ORIGENES_WEB`.
