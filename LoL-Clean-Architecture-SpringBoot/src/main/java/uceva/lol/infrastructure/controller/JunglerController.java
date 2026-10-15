package uceva.lol.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import uceva.lol.application.usecase.GetAllJunglersUseCase;
import uceva.lol.application.usecase.GetJunglerByIdUseCase;
import uceva.lol.application.usecase.GetJunglersByDifficultyUseCase;
import uceva.lol.domain.entity.Jungler;
import uceva.lol.infrastructure.exception.ErrorResponse;

import java.util.List;

/**
 * Controlador REST de campeones de la jungla.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b>. Su unica responsabilidad es
 * recibir la peticion HTTP y delegar en el caso de uso correspondiente;
 * no contiene logica de negocio. Las anotaciones de Swagger viven aqui
 * (infraestructura) para no contaminar el dominio.</p>
 */
@RestController
@RequestMapping("/api/junglers")
@Tag(name = "Junglers", description = "Campeones de la jungla de League of Legends")
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
    @Operation(summary = "Listar campeones de la jungla",
            description = "Devuelve los 20 campeones. Opcionalmente filtra por clase/rol (sin distinguir mayusculas).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado obtenido correctamente",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Jungler.class)))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public List<Jungler> getAll(
            @Parameter(description = "Clase/rol: Asesino, Luchador, Tanque, Mago o Tirador", example = "Asesino")
            @RequestParam(required = false) String role) {
        return getAllJunglersUseCase.execute(role);
    }

    /**
     * GET /api/junglers/{id}
     *
     * @param id identificador del campeon
     * @return detalle del campeon
     */
    @Operation(summary = "Obtener un campeon por id", description = "Devuelve el detalle de un campeon de la jungla.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Campeon encontrado",
                    content = @Content(schema = @Schema(implementation = Jungler.class))),
            @ApiResponse(responseCode = "400", description = "El id no es un numero entero",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "No existe un campeon con ese id",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/{id}")
    public Jungler getById(@Parameter(description = "Identificador del campeon (1 a 20)", example = "1")
                           @PathVariable Integer id) {
        return getJunglerByIdUseCase.execute(id);
    }

    /**
     * GET /api/junglers/difficulty/{level}
     *
     * @param level dificultad 1 (Baja), 2 (Moderada) o 3 (Alta)
     * @return campeones con esa dificultad
     */
    @Operation(summary = "Listar campeones por dificultad",
            description = "Filtra los campeones por nivel de dificultad: 1 (Baja), 2 (Moderada) o 3 (Alta).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Listado filtrado correctamente",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Jungler.class)))),
            @ApiResponse(responseCode = "400", description = "Dificultad fuera de rango o no numerica",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor",
                    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/difficulty/{level}")
    public List<Jungler> getByDifficulty(@Parameter(description = "Nivel de dificultad (1 a 3)", example = "2")
                                         @PathVariable Integer level) {
        return getJunglersByDifficultyUseCase.execute(level);
    }
}
