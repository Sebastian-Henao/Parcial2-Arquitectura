import { PERSONAJES_MOCK } from './personajes.mock';

describe('PERSONAJES_MOCK', () => {
  it('provides representative personajes for the supported roles', () => {
    expect(PERSONAJES_MOCK).toHaveLength(2);
    expect(PERSONAJES_MOCK[0]).toEqual({
      id: 1,
      nombre: 'Loki',
      alias: 'Dios de las mentiras',
      juego: 'Marvel Rivals',
      habilidad: 'Hechicero',
      rol: 'Ilusionista',
    });
    expect(PERSONAJES_MOCK[1]).toEqual({
      id: 2,
      nombre: 'Nathan Drake',
      alias: 'Nate',
      juego: 'Uncharted',
      habilidad: 'Experto en armas y supervivencia',
      rol: 'Ladron',
    });
  });
});
