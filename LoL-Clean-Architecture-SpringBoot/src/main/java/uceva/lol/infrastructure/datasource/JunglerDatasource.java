package uceva.lol.infrastructure.datasource;

import uceva.lol.domain.entity.Jungler;

import java.util.List;

/**
 * Fuente de datos en memoria con los 20 campeones de la jungla de League of Legends.
 *
 * <p>Pertenece a la capa de <b>infraestructura</b>. Los datos estan "quemados"
 * (hardcodeados) porque el microservicio no utiliza base de datos.</p>
 *
 * <p>Dificultad: 1 = Baja, 2 = Moderada, 3 = Alta.</p>
 */
public class JunglerDatasource {

    /** Lista inmutable con los 20 campeones. */
    private final List<Jungler> junglers = List.of(
            new Jungler(1, "Lee Sin", "el Monje Ciego", "Luchador", 3, "Jonia", "Físico",
                    "Jungla de presión temprana con gran movilidad; famoso por la patada 'Insec' que devuelve enemigos hacia su equipo.",
                    List.of("Onda Sónica / Golpe Resonante", "Salvaguardia / Voluntad de Hierro", "Tempestad / Mutilar", "Furia del Dragón")),
            new Jungler(2, "Kha'Zix", "el Saqueador del Vacío", "Asesino", 2, "El Vacío", "Físico",
                    "Depredador que caza objetivos aislados; evoluciona sus habilidades a medida que sube de nivel.",
                    List.of("Probar el Miedo", "Espina del Vacío", "Salto", "Asalto del Vacío")),
            new Jungler(3, "Master Yi", "el Espadachín Wuju", "Asesino", 1, "Jonia", "Físico",
                    "Limpia campamentos muy rápido y destroza peleas tardías gracias a sus reinicios al conseguir asesinatos.",
                    List.of("Golpe Alfa", "Meditación", "Estilo Wuju", "Highlander")),
            new Jungler(4, "Warwick", "la Ira Desencadenada de Zaun", "Luchador", 1, "Zaun", "Físico",
                    "Rastrea a los enemigos heridos por el mapa y se cura con cada golpe; ideal para aprender a jugar en la jungla.",
                    List.of("Fauces de la Bestia", "Cacería Sangrienta", "Aullido Primigenio", "Coerción Infinita")),
            new Jungler(5, "Amumu", "la Momia Triste", "Tanque", 1, "Shurima", "Mágico",
                    "Iniciador con control de masas en área; su definitiva puede ganar peleas de equipo por sí sola.",
                    List.of("Lanzamiento de Venda", "Desesperación", "Berrinche", "Maldición de la Momia Triste")),
            new Jungler(6, "Elise", "la Reina Araña", "Mago", 3, "Noxus", "Mágico",
                    "Alterna entre forma humana y arácnida; muy fuerte en emboscadas tempranas con su capullo aturdidor.",
                    List.of("Neurotoxina / Mordisco Venenoso", "Araña Volátil / Frenesí Esquelético", "Capullo / Rapel", "Forma de Araña")),
            new Jungler(7, "Evelynn", "el Abrazo Agonizante", "Asesino", 3, "Runaterra", "Mágico",
                    "Asesina invisible a partir de nivel 6; aparece por sorpresa para eliminar objetivos vulnerables.",
                    List.of("Púa Odiosa", "Seducción", "Latigazo", "Último Abrazo")),
            new Jungler(8, "Graves", "el Forajido", "Tirador", 2, "Aguasturbias", "Físico",
                    "Tirador de escopeta que limpia la jungla con rapidez y castiga con daño explosivo a corta distancia.",
                    List.of("Fin de la Línea", "Cortina de Humo", "Rapidez", "Daño Colateral")),
            new Jungler(9, "Hecarim", "la Sombra de la Guerra", "Luchador", 2, "Islas de la Sombra", "Físico",
                    "Gana velocidad de movimiento constantemente y carga contra la línea trasera enemiga provocando miedo.",
                    List.of("Barrido", "Aura de Desesperación", "Carga Devastadora", "Embestida de las Sombras")),
            new Jungler(10, "Jarvan IV", "el Ejemplo de Demacia", "Tanque", 2, "Demacia", "Físico",
                    "Combo de estandarte y lanza para iniciar; su cataclismo encierra a los enemigos en una arena.",
                    List.of("Golpe del Dragón", "Égida Dorada", "Estandarte Demaciano", "Cataclismo")),
            new Jungler(11, "Kayn", "el Segador de las Sombras", "Asesino", 3, "Jonia", "Físico",
                    "Atraviesa muros y se transforma en Rhaast o en Asesino de las Sombras según la composición enemiga.",
                    List.of("Barrido Segador", "Alcance de la Cuchilla", "Paso de las Sombras", "Transgresión Umbral")),
            new Jungler(12, "Kindred", "los Cazadores Eternos", "Tirador", 3, "Runaterra", "Físico",
                    "Marca objetivos en la jungla enemiga para acumular poder; su definitiva impide que los aliados mueran.",
                    List.of("Danza de las Flechas", "Frenesí del Lobo", "Miedo Creciente", "Refugio del Cordero")),
            new Jungler(13, "Nidalee", "la Cazadora Bestial", "Asesino", 3, "Ixtal", "Mágico",
                    "Lanza jabalinas a distancia en forma humana y se transforma en puma para rematar; ritmo de jungla muy alto.",
                    List.of("Jabalina / Derribo", "Emboscada / Abalanzarse", "Oleada Primitiva / Zarpazo", "Aspecto del Puma")),
            new Jungler(14, "Nocturne", "la Pesadilla Eterna", "Asesino", 1, "Runaterra", "Físico",
                    "Su definitiva apaga la visión de todo el equipo enemigo y le permite lanzarse sobre un objetivo lejano.",
                    List.of("Cuchilla Crepuscular", "Manto de Oscuridad", "Terror Indescriptible", "Paranoia")),
            new Jungler(15, "Rammus", "el Armadillo Acorazado", "Tanque", 1, "Shurima", "Mágico",
                    "Rueda a gran velocidad para emboscar y provoca a los enemigos; castiga a los campeones de daño físico.",
                    List.of("Bola Acorazada", "Rizo Defensivo", "Provocación Frenética", "Golpe Sísmico")),
            new Jungler(16, "Rek'Sai", "la Excavadora del Vacío", "Luchador", 2, "El Vacío", "Físico",
                    "Detecta enemigos bajo tierra y crea túneles por el mapa para emboscar desde ángulos inesperados.",
                    List.of("Furia de la Reina / Excavación Prismática", "Excavar / Emerger", "Mordisco Furioso / Túnel", "Furia del Vacío")),
            new Jungler(17, "Sejuani", "la Furia del Invierno", "Tanque", 2, "Freljord", "Mágico",
                    "Tanque montada en su jabalí Bristle; congela y aturde a varios enemigos para iniciar peleas.",
                    List.of("Embestida Ártica", "Ira del Invierno", "Escarcha Permanente", "Prisión Glacial")),
            new Jungler(18, "Vi", "la Agente de Piltover", "Luchador", 1, "Piltover", "Físico",
                    "Con sus guanteletes atrapa a un objetivo de forma imparable con su definitiva; perfecta para asegurar asesinatos.",
                    List.of("Rompebóvedas", "Golpes Abrumadores", "Fuerza Excesiva", "Asalto y Batería")),
            new Jungler(19, "Xin Zhao", "el Senescal de Demacia", "Luchador", 1, "Demacia", "Físico",
                    "Luchador agresivo de juego temprano; derriba a los enemigos y bloquea ataques lejanos con su definitiva.",
                    List.of("Golpe de Tres Talones", "Viento Trueno", "Carga Audaz", "Barrido Creciente")),
            new Jungler(20, "Viego", "el Rey Arruinado", "Asesino", 2, "Islas de la Sombra", "Físico",
                    "Posee los cuerpos de los enemigos que elimina y usa sus habilidades; muy fuerte en peleas caóticas.",
                    List.of("Hoja del Rey Arruinado", "Bruma Espectral", "Camino del Espectro", "Rompecorazones"))
    );

    /**
     * Devuelve todos los campeones de la jungla.
     *
     * @return lista inmutable con los 20 campeones
     */
    public List<Jungler> getAll() {
        return junglers;
    }
}
