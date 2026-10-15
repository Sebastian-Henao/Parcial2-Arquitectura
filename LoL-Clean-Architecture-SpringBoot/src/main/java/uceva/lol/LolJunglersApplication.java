package uceva.lol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada del microservicio MS-LoL-SPRING.
 *
 * <p>Levanta el servidor embebido de Spring Boot en el puerto 3004
 * (configurado en {@code application.properties}) y expone la API
 * de los campeones de la jungla de League of Legends.</p>
 */
@SpringBootApplication
public class LolJunglersApplication {

    /**
     * Metodo principal que arranca la aplicacion Spring Boot.
     *
     * @param args argumentos de linea de comandos
     */
    public static void main(String[] args) {
        SpringApplication.run(LolJunglersApplication.class, args);
    }

}
