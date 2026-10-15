import 'dotenv/config';
import { crearAplicacion } from './infraestructura/http/crear-aplicacion';

const port = Number(process.env.PORT ?? 3003);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const origenesWeb = (process.env.ORIGENES_WEB ?? 'http://localhost:4200,http://localhost:4003')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

crearAplicacion(origenesWeb).listen(port, () => {
  console.log(`API de misiones escuchando en http://localhost:${port}`);
});
