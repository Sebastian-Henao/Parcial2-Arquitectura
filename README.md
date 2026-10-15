# Parcial II — Microfrontends y Clean Architecture

Monorepositorio del Parcial II de Arquitectura de Software (UCEVA). Integra un host Angular,
tres microfrontends independientes y tres microservicios mediante Module Federation y APIs REST.

## Componentes y puertos

| Aplicación | Tecnología | Puerto | Función |
| --- | --- | ---: | --- |
| Host | Angular + Module Federation | 4200 | Integra los microfrontends y ofrece navegación |
| MFE Personajes | Angular + Module Federation | 4202 | Gestión de personajes |
| API Personajes | Node.js | 3002 | API consumida por Personajes |
| MFE LoL | Angular + Module Federation | 4004 | Catálogo de campeones de jungla |
| API LoL | Spring Boot | 3004 | API consumida por LoL |
| MFE Central de Misiones | Angular + Module Federation | 4003 | Consultar misiones, ver detalle y actualizar estado |
| API Central de Misiones | Node.js + Express | 3003 | API consumida por Central de Misiones |

Los tres microfrontends consumen exclusivamente su API asignada. La entrada federada de Central
de Misiones es `http://localhost:4003/remoteEntry.js` y expone `./PaginaCentralMisiones`.
El host y las rutas se mantienen en `Client-Host-Angular`.

## Ejecución de Central de Misiones

Requiere Node.js 20.19 o superior y npm. Abre terminales desde la raíz del monorepositorio.

Terminal 1 — API:

```powershell
cd Central-Misiones-NodeJS
npm install
Copy-Item .env.example .env
npm run dev
```

Terminal 2 — MFE standalone:

```powershell
cd Microfrontend-Central-Misiones-Angular
npm install
npm start
```

Abre `http://localhost:4003` para visualizar la aplicación. La API y su documentación Swagger
están disponibles en `http://localhost:3003/api/misiones` y `http://localhost:3003/api/docs`.
Las guías específicas están en [Central-Misiones-NodeJS/README.md](./Central-Misiones-NodeJS/README.md)
y [Microfrontend-Central-Misiones-Angular/README.md](./Microfrontend-Central-Misiones-Angular/README.md).

## Ejecución integrada con el Host

Para navegar desde el host, inicia cada API y cada MFE en su puerto indicado arriba y ejecuta
el host:

```powershell
cd Client-Host-Angular
npm install
npm start
```

Luego abre `http://localhost:4200`. Los remotes deben estar declarados en la configuración de
Module Federation del host y sus rutas deben estar disponibles en el navbar.

## Pruebas

La API de Misiones compila y ejecuta sus pruebas de endpoints con:

```powershell
cd Central-Misiones-NodeJS
npm test
```

El MFE de Misiones ejecuta sus pruebas de unidad y verifica más del 90% de cobertura con:

```powershell
cd Microfrontend-Central-Misiones-Angular
npm run test:coverage
```
