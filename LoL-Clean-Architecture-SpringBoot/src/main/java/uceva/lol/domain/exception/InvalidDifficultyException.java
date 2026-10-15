package uceva.lol.domain.exception;

/**
 * Excepcion de dominio lanzada cuando se solicita una dificultad fuera del rango permitido (1 a 3).
 *
 * <p>Es Java puro (sin Spring). La capa de infraestructura la traduce
 * a una respuesta HTTP 400.</p>
 */
public class InvalidDifficultyException extends RuntimeException {

    /**
     * Crea la excepcion con un mensaje que incluye el nivel invalido.
     *
     * @param level nivel de dificultad recibido
     */
    public InvalidDifficultyException(Integer level) {
        super("La dificultad " + level + " no es valida. Valores permitidos: 1 (Baja), 2 (Moderada), 3 (Alta)");
    }
}
