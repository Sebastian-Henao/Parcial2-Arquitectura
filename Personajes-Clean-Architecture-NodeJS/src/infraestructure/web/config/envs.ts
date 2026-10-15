import { get } from "env-var";
import "dotenv/config";

/**
 * Configuración de entorno validada al cargar el módulo.
 *
 * `PORT` es obligatorio y `PUBLIC_PATH` usa `public` como valor por defecto.
 */
export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};