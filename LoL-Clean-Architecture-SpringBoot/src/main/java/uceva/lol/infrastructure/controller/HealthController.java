package uceva.lol.infrastructure.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Controlador de salud del microservicio.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b>. Expone un endpoint
 * sencillo para confirmar que el backend esta levantado en el puerto 3004.</p>
 */
@RestController
public class HealthController {

    /**
     * Endpoint raiz que confirma el funcionamiento del microservicio.
     *
     * @return mapa con el nombre del servicio, estado y puerto
     */
    @GetMapping({"/", "/api/health"})
    public Map<String, Object> health() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "MS-LoL-SPRING");
        response.put("status", "UP");
        response.put("port", 3004);
        response.put("message", "Microservicio de junglers de League of Legends funcionando correctamente");
        return response;
    }
}
