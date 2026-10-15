import { Routes } from '@angular/router';
import { PersonajesPage } from './presentation/pages/personajes.page';

export const routes: Routes = [
    { path: 'personajes', component: PersonajesPage },
    { path: '**', redirectTo: 'personajes' },
];
