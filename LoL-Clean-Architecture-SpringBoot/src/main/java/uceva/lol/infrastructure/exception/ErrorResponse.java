package uceva.lol.infrastructure.exception;

import java.time.LocalDateTime;

/**
 * Cuerpo estandar de las respuestas de error del microservicio.
 *
 * @param timestamp fecha y hora del error
 * @param status    codigo HTTP
 * @param error     descripcion corta del codigo HTTP
 * @param message   mensaje detallado del error
 * @param path      ruta solicitada
 */
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
