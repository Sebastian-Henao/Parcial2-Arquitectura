import { Request, Response } from 'express';
import { EstadoMision, estadosMision } from '../../domain/entities/mision';
import { ObtenerTodasMisiones } from '../../application/casos-de-uso/obtener-todas-misiones.caso-de-uso';
import { ObtenerMisionPorId } from '../../application/casos-de-uso/obtener-mision-por-id.caso-de-uso';
import { ActualizarEstadoMision } from '../../application/casos-de-uso/actualizar-estado-mision.caso-de-uso';

export class MisionesControlador {
  constructor(
    private readonly obtenerTodasMisiones: ObtenerTodasMisiones,
    private readonly obtenerMisionPorId: ObtenerMisionPorId,
    private readonly actualizarEstadoMision: ActualizarEstadoMision,
  ) {}

  listar = async (_request: Request, response: Response): Promise<void> => {
    response.json(await this.obtenerTodasMisiones.ejecutar());
  };

  consultarPorId = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    if (typeof id !== 'string') {
      response.status(400).json({ mensaje: 'El identificador de misión no es válido.' });
      return;
    }

    const mision = await this.obtenerMisionPorId.ejecutar(id);
    if (!mision) {
      response.status(404).json({ mensaje: 'No se encontró la misión.' });
      return;
    }

    response.json(mision);
  };

  actualizarEstado = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    if (typeof id !== 'string') {
      response.status(400).json({ mensaje: 'El identificador de misión no es válido.' });
      return;
    }

    const { estado } = request.body as { estado?: unknown };
    if (!esEstadoMision(estado)) {
      response.status(400).json({
        mensaje: `El estado debe ser uno de: ${estadosMision.join(', ')}.`,
      });
      return;
    }

    const mision = await this.actualizarEstadoMision.ejecutar(id, estado);
    if (!mision) {
      response.status(404).json({ mensaje: 'No se encontró la misión.' });
      return;
    }

    response.json(mision);
  };
}

function esEstadoMision(valor: unknown): valor is EstadoMision {
  return typeof valor === 'string' && estadosMision.some((estado) => estado === valor);
}
