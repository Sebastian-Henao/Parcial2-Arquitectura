/**
 * Esquemas OpenAPI reutilizables de la API.
 *
 * @openapi
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       description: Representa un personaje del sistema
 *       required:
 *         - id
 *         - nombre
 *         - alias
 *         - juego
 *         - habilidad
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Aiko
 *         alias:
 *           type: string
 *           example: La sombra
 *         juego:
 *           type: string
 *           example: Cyber Realm
 *         habilidad:
 *           type: string
 *           example: Teletransportación
 *         rol:
 *           type: string
 *           enum:
 *             - Vanguardia
 *             - Ladron
 *             - Jefe
 *             - Ilusionista
 *             - Explorador
 *           example: Vanguardia
 */

export {};