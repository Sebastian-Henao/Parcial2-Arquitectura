# Parcial II — Microfrontends & Clean Architecture

Monorepositorio del Parcial II de Arquitectura de Software (UCEVA). La rama `feature/LoL` contiene el microservicio de campeones de jungla, su microfrontend Angular federado y un Host Angular para integrarlo.

## Microfrontend LoL — Junglers

El MFE lista los 20 campeones de la jungla y permite filtrarlos por clase o dificultad, además de consultar su detalle. La interfaz usa solo texto y CSS; no carga imágenes ni assets de campeones.

| Aplicación | Puerto | Función |
| --- | ---: | --- |
| Host Angular | 4200 | Shell de navegación; carga el remote `mf-lol` en `/lol` |
| MFE-LoL Angular | 4004 | Catálogo federado; también se puede ejecutar de forma independiente |
| MS-LoL-SPRING | 3004 | API REST en memoria que consume exclusivamente el MFE |

El MFE envía peticiones HTTP a `http://localhost:3004/api/junglers`. El origen del navegador será `http://localhost:4200` al navegar desde el Host o `http://localhost:4004` al abrir el MFE directamente; ambos están permitidos por CORS.

### Requisitos

- Node.js 20.19+ (se trabajó con Node 24) y npm
- Java 21

### Instalar dependencias

Desde la raíz del monorepo:

```powershell
cd LoL-Clean-Architecture-Angular
npm install

cd ..\Client-Host-Angular
npm install
```

El backend utiliza Gradle Wrapper y descargará Gradle/dependencias en su primera ejecución.

### Ejecutar el sistema integrado

Abre tres terminales desde la raíz del monorepo:

```powershell
cd LoL-Clean-Architecture-SpringBoot
.\gradlew.bat bootRun
```

```powershell
cd LoL-Clean-Architecture-Angular
npm start
```

```powershell
cd Client-Host-Angular
npm start
```

Cuando los tres estén arriba, navega a [http://localhost:4200](http://localhost:4200) y selecciona **LoL · Junglers** en el navbar. El MFE standalone está disponible en [http://localhost:4004](http://localhost:4004).

### API y Swagger

- `GET http://localhost:3004/` — estado del microservicio
- `GET http://localhost:3004/api/junglers` — catálogo completo
- `GET http://localhost:3004/api/junglers?role=Asesino` — filtro por clase
- `GET http://localhost:3004/api/junglers/{id}` — detalle
- `GET http://localhost:3004/api/junglers/difficulty/{level}` — filtro por dificultad (1–3)
- [Swagger UI](http://localhost:3004/swagger-ui.html)
- [Especificación OpenAPI](http://localhost:3004/v3/api-docs)

### Pruebas, cobertura y documentación

```powershell
cd LoL-Clean-Architecture-SpringBoot
.\gradlew.bat test

cd ..\LoL-Clean-Architecture-Angular
npm run test:coverage
npm run docs
```

El reporte HTML de cobertura se genera en `LoL-Clean-Architecture-Angular/coverage/`. Compodoc genera la documentación en `LoL-Clean-Architecture-Angular/documentation/`.

### Arquitectura

El backend conserva las capas `domain`, `application` e `infrastructure`: el dominio es Java puro, los tres casos de uso dependen del contrato del repositorio y el controlador REST delega en ellos. La infraestructura carga los campeones desde un datasource en memoria.

El MFE sigue el Taller 6: `core/domain` define el modelo y contrato abstracto; `core/application/usecases` contiene los tres casos de uso; `core/infrastructure` implementa el repositorio HTTP; y `presentation` contiene la pantalla. El Host y el remote siguen el patrón de Module Federation del Taller 5 (`@angular-architects/module-federation`, `remoteEntry.js`).