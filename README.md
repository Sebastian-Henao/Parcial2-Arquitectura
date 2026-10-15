# Parcial II — Microfrontends y Clean Architecture

Monorepositorio del Parcial II de Arquitectura de Software (UCEVA). Integra un host Angular,
tres microfrontends independientes y tres microservicios mediante Module Federation y APIs REST.

## Requisitos

- Node.js 20.19 o superior y npm.
- Java Development Kit (JDK) 21 para el microservicio LoL.
- PowerShell o una terminal compatible con los comandos del sistema operativo.

Instala las dependencias npm dentro de cada proyecto Angular o Node.js que vayas a ejecutar.
El backend LoL incluye el wrapper de Gradle (`gradlew.bat`), por lo que no es necesario instalar
Gradle globalmente.

## Aplicaciones y puertos

| Componente | Carpeta | Tecnología | Puerto | URL local |
| --- | --- | --- | ---: | --- |
| Host | `Client-Host-Angular` | Angular + Module Federation | 4200 | <http://localhost:4200> |
| MFE Personajes | `Microfrontend-Personajes-Angular` | Angular + Module Federation | 4202 | <http://localhost:4202> |
| API Personajes | `Personajes-Clean-Architecture-NodeJS` | Node.js + Express | 3002 | <http://localhost:3002> |
| MFE LoL | `LoL-Clean-Architecture-Angular` | Angular + Module Federation | 4004 | <http://localhost:4004> |
| API LoL | `LoL-Clean-Architecture-SpringBoot` | Spring Boot | 3004 | <http://localhost:3004> |
| MFE Central de Misiones | `Microfrontend-Central-Misiones-Angular` | Angular + Module Federation | 4003 | <http://localhost:4003> |
| API Central de Misiones | `Central-Misiones-NodeJS` | Node.js + Express | 3003 | <http://localhost:3003> |

El Host carga las páginas en `/personajes`, `/lol` y `/misiones`. Cada microfrontend también
puede abrirse por su propia URL. Para que una funcionalidad cargue datos, inicia tanto el MFE
como su microservicio correspondiente.

## Ejecución completa en Windows

Abre una terminal por componente y ejecuta los comandos desde la raíz del repositorio. Mantén
cada proceso activo en su terminal. Las APIs y microfrontends pueden iniciarse en cualquier orden;
sin embargo, ambos deben estar activos antes de usar la página correspondiente.

### 1. API Personajes — puerto 3002

```powershell
cd .\Personajes-Clean-Architecture-NodeJS
npm install
$env:PORT = "3002"
npm start
```

La variable `PORT` es obligatoria. Si prefieres no configurarla en cada sesión, crea un archivo
`.env` en esa carpeta con `PORT=3002`. La documentación Swagger está en
<http://localhost:3002/api/docs>.

### 2. Microfrontend Personajes — puerto 4202

```powershell
cd .\Microfrontend-Personajes-Angular
npm install
npm start -- --port 4202
```

Consume la API Personajes en `http://localhost:3002`. Su entrada Module Federation es
<http://localhost:4202/remoteEntry.js>.

### 3. API LoL — puerto 3004

Requiere JDK 21:

```powershell
cd .\LoL-Clean-Architecture-SpringBoot
.\gradlew.bat bootRun
```

Swagger UI: <http://localhost:3004/swagger-ui.html>. OpenAPI JSON:
<http://localhost:3004/v3/api-docs>.

### 4. Microfrontend LoL — puerto 4004

```powershell
cd .\LoL-Clean-Architecture-Angular
npm install
npm start
```

Consume la API LoL en `http://localhost:3004`.

### 5. API Central de Misiones — puerto 3003

```powershell
cd .\Central-Misiones-NodeJS
npm install
Copy-Item .env.example .env
npm run dev
```

El archivo `.env.example` configura `PORT=3003` y los orígenes web locales permitidos. La API
Swagger está en <http://localhost:3003/api/docs> y el estado del servicio en
<http://localhost:3003/health>.

### 6. Microfrontend Central de Misiones — puerto 4003

```powershell
cd .\Microfrontend-Central-Misiones-Angular
npm install
npm start
```

Consume la API Central de Misiones en `http://localhost:3003`. Su entrada Module Federation es
<http://localhost:4003/remoteEntry.js>.

### 7. Host — puerto 4200

Inicia el host después de los microfrontends:

```powershell
cd .\Client-Host-Angular
npm install
npm start
```

Abre <http://localhost:4200> y selecciona **Personajes**, **LoL · Junglers** o
**Central de Misiones**. El host espera encontrar sus remotes en los puertos 4202, 4004 y 4003.

## Configuración y URLs

- La API Personajes requiere `PORT`; `PUBLIC_PATH` es opcional y usa `public` por defecto.
- La API Central de Misiones toma `PORT` y `ORIGENES_WEB` del archivo `.env`; consulta
  [`Central-Misiones-NodeJS/.env.example`](./Central-Misiones-NodeJS/.env.example).
- El MFE Personajes apunta a la API en `http://localhost:3002`, configurada en
  [`environment.ts`](./Microfrontend-Personajes-Angular/src/environments/environment.ts).
- Las direcciones remotas del Host se configuran en
  [`app.routes.ts`](./Client-Host-Angular/src/app/app.routes.ts).
- Los puertos de Angular están definidos en los scripts `start` de cada `package.json`;
  el puerto de Spring Boot está en `application.properties`.

Si cambias un puerto, actualiza también la URL del servicio consumidor, el remote correspondiente
del Host y los orígenes CORS donde aplique. Los datos de las APIs basadas en Faker se mantienen en
memoria y se reinician al detener el proceso.

## Pruebas

Ejecuta cada comando desde la carpeta del proyecto indicado:

```powershell
# API Central de Misiones
cd .\Central-Misiones-NodeJS
npm test

# Microfrontend Central de Misiones
cd ..\Microfrontend-Central-Misiones-Angular
npm run test:coverage

# Microfrontend Personajes
cd ..\Microfrontend-Personajes-Angular
npm run test:coverage

# Microfrontend LoL
cd ..\LoL-Clean-Architecture-Angular
npm run test:coverage

# API LoL
cd ..\LoL-Clean-Architecture-SpringBoot
.\gradlew.bat test
```
