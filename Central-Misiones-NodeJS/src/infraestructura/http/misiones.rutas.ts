import { Router } from 'express';
import { MisionesControlador } from './misiones.controlador';

export function crearRutasMisiones(controlador: MisionesControlador): Router {
  const router = Router();

  router.get('/', controlador.listar);
  router.get('/:id', controlador.consultarPorId);
  router.patch('/:id/estado', controlador.actualizarEstado);

  return router;
}
