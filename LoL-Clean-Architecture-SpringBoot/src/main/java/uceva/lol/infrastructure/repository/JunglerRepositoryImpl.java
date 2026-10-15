package uceva.lol.infrastructure.repository;

import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.repository.JunglerRepository;
import uceva.lol.infrastructure.datasource.JunglerDatasource;

import java.util.List;
import java.util.Optional;

/**
 * Implementacion concreta del contrato {@link JunglerRepository}.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b> y actua como adaptador
 * entre el dominio y la fuente de datos en memoria {@link JunglerDatasource}.</p>
 */
public class JunglerRepositoryImpl extends JunglerRepository {

    /** Fuente de datos de campeones. */
    private final JunglerDatasource junglerDatasource;

    /**
     * @param junglerDatasource fuente de datos en memoria
     */
    public JunglerRepositoryImpl(JunglerDatasource junglerDatasource) {
        this.junglerDatasource = junglerDatasource;
    }

    /** {@inheritDoc} */
    @Override
    public List<Jungler> getAll() {
        return junglerDatasource.getAll();
    }

    /** {@inheritDoc} */
    @Override
    public Optional<Jungler> getById(Integer id) {
        return junglerDatasource.getAll().stream()
                .filter(jungler -> jungler.getId().equals(id))
                .findFirst();
    }
}
