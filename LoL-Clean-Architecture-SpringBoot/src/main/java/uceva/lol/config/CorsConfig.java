package uceva.lol.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuracion de CORS del microservicio.
 *
 * <p>Permite peticiones desde:</p>
 * <ul>
 *   <li>{@code http://localhost:4200}: Host. Cuando el microfrontend se carga dentro
 *   del Host, el navegador envia las peticiones con este origen.</li>
 *   <li>{@code http://localhost:4004}: microfrontend LoL ejecutado en modo standalone.</li>
 * </ul>
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * Registra las reglas CORS para los endpoints de la API.
     *
     * @param registry registro de CORS de Spring MVC
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200", "http://localhost:4004")
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*");
    }
}
