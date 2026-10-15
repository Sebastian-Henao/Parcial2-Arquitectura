# Parcial2-Arquitectura

## Aporte: Central de Misiones

Este aporte agrega un microfrontend Angular federado y un microservicio Node.js independiente
para consultar misiones, ver su detalle y actualizar su estado. El dominio es una central
original de operaciones de héroes; no reutiliza personajes ni recursos de franquicias externas.

| Aplicación | Tecnología | Puerto |
| --- | --- | ---: |
| Host del equipo | Angular + Module Federation | 4200 |
| MFE Central de Misiones | Angular + Module Federation | 4003 |
| API Central de Misiones | Node.js + Express | 3003 |

El MFE `mf-misiones` consume exclusivamente la API Central de Misiones en el puerto `3003`.
Su entrada federada es `http://localhost:4003/remoteEntry.js`; el host debe registrar el remote
y exponer una ruta para `./PaginaCentralMisiones`.

### Ejecutar este aporte

En una terminal:

```powershell
cd Central-Misiones-NodeJS
npm install
Copy-Item .env.example .env
npm run dev
```

En otra terminal:

```powershell
cd Microfrontend-Central-Misiones-Angular
npm install
npm start
```

La API publica Swagger en `http://localhost:3003/api/docs`. La guía detallada de cada parte
está en [Central-Misiones-NodeJS/README.md](./Central-Misiones-NodeJS/README.md) y
[Microfrontend-Central-Misiones-Angular/README.md](./Microfrontend-Central-Misiones-Angular/README.md).