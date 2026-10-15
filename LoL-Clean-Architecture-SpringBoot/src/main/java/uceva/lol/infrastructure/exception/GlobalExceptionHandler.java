package uceva.lol.infrastructure.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import uceva.lol.domain.exception.InvalidDifficultyException;
import uceva.lol.domain.exception.JunglerNotFoundException;

import java.time.LocalDateTime;

/**
 * Manejador global de excepciones del microservicio.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b>: traduce las excepciones
 * del dominio y del framework a respuestas HTTP con un cuerpo uniforme
 * ({@link ErrorResponse}).</p>
 *
 * <ul>
 *   <li>404: campeon o recurso inexistente</li>
 *   <li>400: parametros invalidos (dificultad fuera de rango, id no numerico)</li>
 *   <li>500: cualquier error no controlado</li>
 * </ul>
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 404 - El campeon solicitado no existe.
     *
     * @param ex      excepcion de dominio
     * @param request peticion HTTP
     * @return respuesta 404
     */
    @ExceptionHandler(JunglerNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(JunglerNotFoundException ex, HttpServletRequest request) {
        return build(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    /**
     * 404 - Ruta inexistente en el servidor.
     *
     * @param ex      excepcion de Spring
     * @param request peticion HTTP
     * @return respuesta 404
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResource(NoResourceFoundException ex, HttpServletRequest request) {
        return build(HttpStatus.NOT_FOUND, "El recurso solicitado no existe", request);
    }

    /**
     * 400 - Dificultad fuera del rango permitido.
     *
     * @param ex      excepcion de dominio
     * @param request peticion HTTP
     * @return respuesta 400
     */
    @ExceptionHandler(InvalidDifficultyException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDifficulty(InvalidDifficultyException ex, HttpServletRequest request) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    /**
     * 400 - Parametro con tipo incorrecto (ej: /api/junglers/abc).
     *
     * @param ex      excepcion de Spring
     * @param request peticion HTTP
     * @return respuesta 400
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        String message = "El parametro '" + ex.getName() + "' debe ser un numero entero";
        return build(HttpStatus.BAD_REQUEST, message, request);
    }

    /**
     * 500 - Cualquier error inesperado.
     *
     * @param ex      excepcion no controlada
     * @param request peticion HTTP
     * @return respuesta 500
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", request);
    }

    /**
     * Construye la respuesta de error con formato uniforme.
     */
    private ResponseEntity<ErrorResponse> build(HttpStatus status, String message, HttpServletRequest request) {
        ErrorResponse body = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(body);
    }
}
