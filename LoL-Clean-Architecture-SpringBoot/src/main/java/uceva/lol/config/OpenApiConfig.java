package uceva.lol.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuracion de la documentacion OpenAPI/Swagger del microservicio.
 *
 * <p>La interfaz grafica queda disponible en
 * {@code http://localhost:3004/swagger-ui.html} y el JSON de la especificacion en
 * {@code http://localhost:3004/v3/api-docs}.</p>
 */
@Configuration
public class OpenApiConfig {

    /**
     * Define la informacion general de la API mostrada en Swagger UI.
     *
     * @return especificacion OpenAPI con titulo, version y servidor
     */
    @Bean
    OpenAPI junglersOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("MS-LoL-SPRING - API de Junglers de League of Legends")
                        .description("Microservicio con Clean Architecture que expone los 20 campeones de la jungla de LoL. "
                                + "Parcial II - Arquitectura de Software (UCEVA).")
                        .version("1.0.0"))
                .servers(List.of(new Server().url("http://localhost:3004").description("Servidor local")));
    }
}
