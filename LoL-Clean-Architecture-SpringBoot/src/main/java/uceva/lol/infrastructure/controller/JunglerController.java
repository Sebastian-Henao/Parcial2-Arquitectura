package uceva.lol.infrastructure.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uceva.lol.application.usecase.GetAllJunglersUseCase;
import uceva.lol.application.usecase.GetJunglerByIdUseCase;
import uceva.lol.application.usecase.GetJunglersByDifficultyUseCase;
import uceva.lol.domain.entity.Jungler;

import java.util.List;

/**
 * Controlador REST de campeones de la jungla.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b>. Su unica responsabilidad es
 * recibir la peticion HTTP y delegar en el caso de uso correspondiente;
 * no contiene logica de negocio.</p>
 */
@RestController
@RequestMapping("/api/junglers")
public class JunglerController {

    private final GetAllJunglersUseCase getAllJunglersUseCase;
    private final GetJunglerByIdUseCase getJunglerByIdUseCase;
    private final GetJunglersByDifficultyUseCase getJunglersByDifficultyUseCase;

    /**
     * Inyeccion de los casos de uso por constructor.
     *
     * @param getAllJunglersUseCase          caso de uso para listar
     * @param getJunglerByIdUseCase          caso de uso para detalle
     * @param getJunglersByDifficultyUseCase caso de uso para filtrar por dificultad
     */
    public JunglerController(GetAllJunglersUseCase getAllJunglersUseCase,
                             GetJunglerByIdUseCase getJunglerByIdUseCase,
                             GetJunglersByDifficultyUseCase getJunglersByDifficultyUseCase) {
        this.getAllJunglersUseCase = getAllJunglersUseCase;
        this.getJunglerByIdUseCase = getJunglerByIdUseCase;
        this.getJunglersByDifficultyUseCase = getJunglersByDifficultyUseCase;
    }

    /**
     * GET /api/junglers?role={rol}
     *
     * @param role clase/rol opcional para filtrar
     * @return lista de campeones
     */
    @GetMapping
    public List<Jungler> getAll(@RequestParam(required = false) String role) {
        return getAllJunglersUseCase.execute(role);
    }

    /**
     * GET /api/junglers/{id}
     *
     * @param id identificador del campeon
     * @return detalle del campeon
     */
    @GetMapping("/{id}")
    public Jungler getById(@PathVariable Integer id) {
        return getJunglerByIdUseCase.execute(id);
    }

    /**
     * GET /api/junglers/difficulty/{level}
     *
     * @param level dificultad 1 (Baja), 2 (Moderada) o 3 (Alta)
     * @return campeones con esa dificultad
     */
    @GetMapping("/difficulty/{level}")
    public List<Jungler> getByDifficulty(@PathVariable Integer level) {
        return getJunglersByDifficultyUseCase.execute(level);
    }
}
