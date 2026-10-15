package uceva.lol.domain.exception;

/**
 * Excepcion de dominio lanzada cuando no existe un campeon con el id solicitado.
 *
 * <p>Es Java puro (sin Spring). La capa de infraestructura la traduce
 * a una respuesta HTTP 404.</p>
 */
public class JunglerNotFoundException extends RuntimeException {

    /**
     * Crea la excepcion con un mensaje que incluye el id buscado.
     *
     * @param id identificador que no fue encontrado
     */
    public JunglerNotFoundException(Integer id) {
        super("No existe un campeon de la jungla con id " + id);
    }
}
