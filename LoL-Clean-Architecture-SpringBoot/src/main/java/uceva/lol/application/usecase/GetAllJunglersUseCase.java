package uceva.lol.application.usecase;

import uceva.lol.domain.entity.Jungler;
import uceva.lol.domain.repository.JunglerRepository;

import java.util.List;

/**
 * Caso de uso: listar los campeones de la jungla, con filtro opcional por clase/rol.
 *
 * <p>Pertenece a la capa de <b>aplicacion</b>. Solo depende del contrato
 * {@link JunglerRepository} (dominio), nunca de una implementacion concreta.</p>
 */
public class GetAllJunglersUseCase {

    /** Repositorio inyectado por contrato. */
    private final JunglerRepository junglerRepository;

    /**
     * @param junglerRepository contrato del repositorio de campeones
     */
    public GetAllJunglersUseCase(JunglerRepository junglerRepository) {
        this.junglerRepository = junglerRepository;
    }

    /**
     * Ejecuta el caso de uso.
     *
     * @param role clase/rol a filtrar (ej: "Asesino"); si es {@code null} o vacio se devuelven todos
     * @return lista de campeones (filtrada si se indico un rol, sin distinguir mayusculas)
     */
    public List<Jungler> execute(String role) {
        List<Jungler> junglers = junglerRepository.getAll();
        if (role == null || role.isBlank()) {
            return junglers;
        }
        return junglers.stream()
                .filter(jungler -> jungler.getRole().equalsIgnoreCase(role.trim()))
                .toList();
    }
}
