import { Routes } from '@angular/router';
import { PersonajesPage } from './presentation/pages/personajes.page';

/**
 * Rutas disponibles en el microfrontend.
 *
 * La ruta comodín redirige a la pantalla principal de personajes.
 */
export const routes: Routes = [
    { path: 'personajes', component: PersonajesPage },
    { path: '**', redirectTo: 'personajes' },
];
