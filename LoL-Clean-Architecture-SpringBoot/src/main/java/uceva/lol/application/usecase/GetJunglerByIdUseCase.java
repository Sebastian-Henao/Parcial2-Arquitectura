package uceva.lol.application.usecase;

import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.exception.JunglerNotFoundException;
import uceva.lol.domain.repository.JunglerRepository;

/**
 * Caso de uso: obtener el detalle de un campeon de la jungla por su id.
 *
 * <p>Pertenece a la capa de <b>aplicacion</b>. Si el campeon no existe
 * lanza la excepcion de dominio {@link JunglerNotFoundException}.</p>
 */
public class GetJunglerByIdUseCase {

    /** Repositorio inyectado por contrato. */
    private final JunglerRepository junglerRepository;

    /**
     * @param junglerRepository contrato del repositorio de campeones
     */
    public GetJunglerByIdUseCase(JunglerRepository junglerRepository) {
        this.junglerRepository = junglerRepository;
    }

    /**
     * Ejecuta el caso de uso.
     *
     * @param id identificador del campeon
     * @return el campeon encontrado
     * @throws JunglerNotFoundException si no existe un campeon con ese id
     */
    public Jungler execute(Integer id) {
        return junglerRepository.getById(id)
                .orElseThrow(() -> new JunglerNotFoundException(id));
    }
}
