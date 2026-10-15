package uceva.lol.domain.repository;

import uceva.lol.domain.entity.Jungler;

import java.util.List;
import java.util.Optional;

/**
 * Contrato (puerto) del repositorio de campeones de la jungla.
 *
 * <p>Pertenece a la capa de <b>dominio</b>. Igual que en el taller de Clean
 * Architecture se define como clase abstracta: los casos de uso dependen de
 * esta abstraccion y la infraestructura aporta la implementacion concreta.</p>
 */
public abstract class JunglerRepository {

    /**
     * Obtiene todos los campeones de la jungla.
     *
     * @return lista con los 20 campeones
     */
    public abstract List<Jungler> getAll();

    /**
     * Busca un campeon por su identificador.
     *
     * @param id identificador del campeon
     * @return {@link Optional} con el campeon o vacio si no existe
     */
    public abstract Optional<Jungler> getById(Integer id);
}
