/**
 * Error de aplicación que incluye el código HTTP que debe devolverse.
 */
export class CustomError extends Error {
    /**
     * Crea un error con estado HTTP y mensaje personalizados.
     *
     * @param statusCode - Código de estado HTTP asociado al error.
     * @param message - Descripción del error.
     */
    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message);
    }

    /** Crea un error HTTP 400 (solicitud incorrecta). */
    static badRequest(message: string): CustomError {
        return new CustomError(400, message);
    }

    /** Crea un error HTTP 401 (no autorizado). */
    static unAuthorized(message: string): CustomError {
        return new CustomError(401, message);
    }

    /** Crea un error HTTP 403 (acceso prohibido). */
    static forbidden(message: string): CustomError {
        return new CustomError(403, message);
    }

    /** Crea un error HTTP 404 (recurso no encontrado). */
    static notFound(message: string): CustomError {
        return new CustomError(404, message);
    }

    /** Crea un error de conflicto. */
    static conflict(message: string): CustomError {
        return new CustomError(4009, message);
    }

    /** Crea un error HTTP 500 (error interno del servidor). */
    static internalServer(message: string): CustomError {
        return new CustomError(500, message);
    }
}