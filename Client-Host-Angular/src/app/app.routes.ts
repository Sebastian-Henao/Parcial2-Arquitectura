import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

/** Rutas del Host; los microfrontends se cargan de forma perezosa. */
export const routes: Routes = [
  {
    path: 'lol',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4004/remoteEntry.js',
        exposedModule: './JunglersPage',
      }).then((module) => module.JunglersPage),
  },
  { path: '', redirectTo: 'lol', pathMatch: 'full' },
  { path: '**', redirectTo: 'lol' },
];
