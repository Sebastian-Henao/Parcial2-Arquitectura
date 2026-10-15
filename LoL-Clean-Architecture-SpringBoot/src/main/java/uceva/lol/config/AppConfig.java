package uceva.lol.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uceva.lol.application.usecase.GetAllJunglersUseCase;
import uceva.lol.application.usecase.GetJunglerByIdUseCase;
import uceva.lol.application.usecase.GetJunglersByDifficultyUseCase;
import uceva.lol.domain.repository.JunglerRepository;
import uceva.lol.infrastructure.datasource.JunglerDatasource;
import uceva.lol.infrastructure.repository.JunglerRepositoryImpl;

/**
 * Configuracion de inyeccion de dependencias (composition root).
 *
 * <p>Igual que en el taller, las clases de dominio y aplicacion NO tienen
 * anotaciones de Spring: aqui se registran manualmente como {@code @Bean}
 * y se enlaza el contrato {@link JunglerRepository} con su implementacion.</p>
 */
@Configuration
public class AppConfig {

    /** @return fuente de datos en memoria */
    @Bean
    JunglerDatasource junglerDatasource() {
        return new JunglerDatasource();
    }

    /**
     * Enlaza el contrato del dominio con la implementacion de infraestructura.
     *
     * @param junglerDatasource fuente de datos
     * @return implementacion del repositorio
     */
    @Bean
    JunglerRepository junglerRepository(JunglerDatasource junglerDatasource) {
        return new JunglerRepositoryImpl(junglerDatasource);
    }

    /**
     * @param junglerRepository contrato del repositorio
     * @return caso de uso para listar campeones
     */
    @Bean
    GetAllJunglersUseCase getAllJunglersUseCase(JunglerRepository junglerRepository) {
        return new GetAllJunglersUseCase(junglerRepository);
    }

    /**
     * @param junglerRepository contrato del repositorio
     * @return caso de uso para obtener un campeon por id
     */
    @Bean
    GetJunglerByIdUseCase getJunglerByIdUseCase(JunglerRepository junglerRepository) {
        return new GetJunglerByIdUseCase(junglerRepository);
    }

    /**
     * @param junglerRepository contrato del repositorio
     * @return caso de uso para filtrar campeones por dificultad
     */
    @Bean
    GetJunglersByDifficultyUseCase getJunglersByDifficultyUseCase(JunglerRepository junglerRepository) {
        return new GetJunglersByDifficultyUseCase(junglerRepository);
    }
}
