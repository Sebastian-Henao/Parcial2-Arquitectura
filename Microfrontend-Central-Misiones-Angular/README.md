# Microfrontend Central de Misiones

Aplicación Angular federada con Module Federation. Su responsabilidad es consultar y gestionar
misiones mediante la API Node.js del mismo dominio.

## Ejecución

Requisitos: Node.js 20.19 o superior y npm.

```powershell
npm install
npm start
```

El microfrontend queda disponible en `http://localhost:4003` y publica su entrada de federación
en `http://localhost:4003/remoteEntry.js`.

Para compilarlo y ejecutar sus pruebas:

```powershell
npm run build
npm run test:coverage
```

Las pruebas se enfocan en los casos de uso, el repositorio HTTP y la página de presentación.
El runner aplica un umbral mínimo del 90% a ramas, funciones, líneas y sentencias de ese código.

## Integración

- Remote name: `mf-misiones`
- Módulo expuesto: `./PaginaCentralMisiones`
- Puerto del MFE: `4003`
- API consumida: `Central-Misiones-NodeJS`, puerto `3003`
- Endpoint base: `http://localhost:3003/api/misiones`

El host debe registrar `mf-misiones` en su configuración de Module Federation y cargar el
módulo `./PaginaCentralMisiones` para mostrar esta página en una de sus rutas.

## Arquitectura Limpia

- `core/domain`: entidad, estados permitidos y contrato del repositorio.
- `core/aplicacion/casos-de-uso`: listar misiones, consultar por identificador y actualizar estado.
- `core/infraestructura`: implementación HTTP del repositorio.
- `presentation`: página Angular que coordina la interacción y presenta los resultados.

La página no accede directamente a `HttpClient`: los casos de uso dependen del contrato del
repositorio, cuya implementación HTTP se inyecta mediante la configuración de Angular.
