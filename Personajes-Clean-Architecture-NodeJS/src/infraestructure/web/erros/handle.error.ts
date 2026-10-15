import { CustomError } from "./custom.error";
import { Response } from "express"

/**
 * Traduce errores de la aplicación a respuestas HTTP.
 */
export class HandleError {
    /**
     * Envía una respuesta de error adecuada según el tipo de excepción.
     *
     * @param error - Error recibido durante el procesamiento de la solicitud.
     * @param res - Respuesta Express donde se escribirá el estado y el cuerpo.
     */
    static error(error: unknown, res: Response) {
        console.log(`${error}`);

        if(error instanceof CustomError) {
            return res
                .status(error.statusCode)
                .json({ error: error.message });
        }

        return res
            .status(500)
            .json({ error: 'Internal Server error' });
    }
}