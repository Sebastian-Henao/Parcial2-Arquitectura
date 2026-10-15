package uceva.lol.application.usecase;

import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.exception.InvalidDifficultyException;
import uceva.lol.domain.repository.JunglerRepository;

import java.util.List;

/**
 * Caso de uso: listar los campeones de la jungla segun su nivel de dificultad.
 *
 * <p>Pertenece a la capa de <b>aplicacion</b>. Valida la regla de negocio
 * "la dificultad debe estar entre 1 y 3"; si no se cumple lanza
 * {@link InvalidDifficultyException}.</p>
 */
public class GetJunglersByDifficultyUseCase {

    /** Dificultad minima permitida (Baja). */
    public static final int MIN_DIFFICULTY = 1;

    /** Dificultad maxima permitida (Alta). */
    public static final int MAX_DIFFICULTY = 3;

    /** Repositorio inyectado por contrato. */
    private final JunglerRepository junglerRepository;

    /**
     * @param junglerRepository contrato del repositorio de campeones
     */
    public GetJunglersByDifficultyUseCase(JunglerRepository junglerRepository) {
        this.junglerRepository = junglerRepository;
    }

    /**
     * Ejecuta el caso de uso.
     *
     * @param level nivel de dificultad: 1 (Baja), 2 (Moderada) o 3 (Alta)
     * @return campeones con esa dificultad
     * @throws InvalidDifficultyException si el nivel esta fuera del rango 1..3
     */
    public List<Jungler> execute(Integer level) {
        if (level == null || level < MIN_DIFFICULTY || level > MAX_DIFFICULTY) {
            throw new InvalidDifficultyException(level);
        }
        return junglerRepository.getAll().stream()
                .filter(jungler -> jungler.getDifficulty().equals(level))
                .toList();
    }
}
