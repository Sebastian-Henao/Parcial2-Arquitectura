const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const { crearAplicacion } = require('../dist/infrastructure/http/create-app');

let server;
let baseUrl;

before(async () => {
  server = crearAplicacion(['http://localhost:4003']).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('informa que la API está disponible', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { estado: 'disponible' });
});

test('lista misiones generadas con Faker', async () => {
  const response = await fetch(`${baseUrl}/api/misiones`);
  const misiones = await response.json();

  assert.equal(response.status, 200);
  assert.equal(misiones.length, 12);
  assert.equal(misiones[0].id, 'mision-1');
  assert.equal(typeof misiones[0].titulo, 'string');
});

test('consulta una misión por su identificador', async () => {
  const response = await fetch(`${baseUrl}/api/misiones/mision-1`);

  assert.equal(response.status, 200);
  assert.equal((await response.json()).id, 'mision-1');
});

test('responde 404 al consultar una misión inexistente', async () => {
  const response = await fetch(`${baseUrl}/api/misiones/no-existe`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { mensaje: 'No se encontró la misión.' });
});

test('actualiza el estado de una misión', async () => {
  const response = await fetch(`${baseUrl}/api/misiones/mision-1/estado`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ estado: 'completada' }),
  });

  assert.equal(response.status, 200);
  assert.equal((await response.json()).estado, 'completada');
});

test('rechaza estados que no pertenecen al dominio', async () => {
  const response = await fetch(`${baseUrl}/api/misiones/mision-1/estado`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ estado: 'desconocido' }),
  });

  assert.equal(response.status, 400);
  assert.match((await response.json()).mensaje, /disponible, en-curso, completada/);
});

test('publica la documentación Swagger', async () => {
  const response = await fetch(`${baseUrl}/api/docs/`);

  assert.equal(response.status, 200);
  assert.match(await response.text(), /swagger-ui/);
});

test('permite al microfrontend realizar solicitudes CORS', async () => {
  const response = await fetch(`${baseUrl}/api/misiones`, {
    headers: { origin: 'http://localhost:4003' },
  });

  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:4003');
});
