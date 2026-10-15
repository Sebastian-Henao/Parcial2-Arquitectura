import { PersonajesPage } from './presentation/pages/personajes.page';
import { routes } from './app.routes';

describe('routes', () => {
  it('renders the personajes page at the personajes path', () => {
    expect(routes[0]).toEqual({ path: 'personajes', component: PersonajesPage });
  });

  it('redirects unknown paths to personajes', () => {
    expect(routes[1]).toEqual({ path: '**', redirectTo: 'personajes' });
  });
});
