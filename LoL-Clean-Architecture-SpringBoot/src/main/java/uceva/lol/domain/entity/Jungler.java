package uceva.lol.domain.entity;

import java.util.List;

/**
 * Entidad de dominio que representa a un campeon de la jungla de League of Legends.
 *
 * <p>Pertenece a la capa de <b>dominio</b>: es Java puro, sin anotaciones
 * ni dependencias de Spring. Por decision de diseno no contiene campos de imagen.</p>
 */
public class Jungler {

    /** Identificador unico del campeon (1 a 20). */
    private final Integer id;

    /** Nombre del campeon (ej: "Lee Sin"). */
    private final String name;

    /** Titulo oficial del campeon (ej: "el Monje Ciego"). */
    private final String title;

    /** Clase o rol del campeon (Asesino, Luchador, Tanque, Mago, Tirador). */
    private final String role;

    /** Dificultad del campeon: 1 = Baja, 2 = Moderada, 3 = Alta. */
    private final Integer difficulty;

    /** Region de Runaterra de la que proviene el campeon. */
    private final String region;

    /** Tipo de dano principal (Fisico, Magico). */
    private final String damageType;

    /** Breve descripcion del estilo de juego en la jungla. */
    private final String description;

    /** Habilidades principales del campeon (Q, W, E, R). */
    private final List<String> abilities;

    /**
     * Construye un campeon de la jungla.
     *
     * @param id          identificador unico
     * @param name        nombre del campeon
     * @param title       titulo oficial
     * @param role        clase o rol
     * @param difficulty  dificultad (1 a 3)
     * @param region      region de origen
     * @param damageType  tipo de dano principal
     * @param description descripcion del estilo de juego
     * @param abilities   habilidades principales
     */
    public Jungler(Integer id, String name, String title, String role, Integer difficulty,
                   String region, String damageType, String description, List<String> abilities) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.role = role;
        this.difficulty = difficulty;
        this.region = region;
        this.damageType = damageType;
        this.description = description;
        this.abilities = List.copyOf(abilities);
    }

    /** @return identificador unico */
    public Integer getId() { return id; }

    /** @return nombre del campeon */
    public String getName() { return name; }

    /** @return titulo oficial */
    public String getTitle() { return title; }

    /** @return clase o rol */
    public String getRole() { return role; }

    /** @return dificultad (1 a 3) */
    public Integer getDifficulty() { return difficulty; }

    /** @return region de origen */
    public String getRegion() { return region; }

    /** @return tipo de dano principal */
    public String getDamageType() { return damageType; }

    /** @return descripcion del estilo de juego */
    public String getDescription() { return description; }

    /** @return habilidades principales (lista inmutable) */
    public List<String> getAbilities() { return abilities; }
}
