import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { ObtenerTodasMisiones } from '../../aplicacion/casos-de-uso/obtener-todas-misiones.caso-de-uso';
import { ObtenerMisionPorId } from '../../aplicacion/casos-de-uso/obtener-mision-por-id.caso-de-uso';
import { ActualizarEstadoMision } from '../../aplicacion/casos-de-uso/actualizar-estado-mision.caso-de-uso';
import { FakerMisionesFuente } from '../fuentes-datos/faker-misiones.fuente';
import { FakerMisionesRepositorio } from '../repositorios/faker-misiones.repositorio';
import { MisionesControlador } from './misiones.controlador';
import { crearRutasMisiones } from './misiones.rutas';
import { openApiSpec } from './swagger';

const fuente = new FakerMisionesFuente();
const repositorio = new FakerMisionesRepositorio(fuente);
const controlador = new MisionesControlador(
  new ObtenerTodasMisiones(repositorio),
  new ObtenerMisionPorId(repositorio),
  new ActualizarEstadoMision(repositorio),
);

export function crearAplicacion(origenesWeb: string[]): express.Express {
  const app = express();

  app.use(cors({ origin: origenesWeb }));
  app.use(express.json());
  app.get('/health', (_request, response) => response.json({ estado: 'disponible' }));
  app.use('/api/misiones', crearRutasMisiones(controlador));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

  return app;
}
