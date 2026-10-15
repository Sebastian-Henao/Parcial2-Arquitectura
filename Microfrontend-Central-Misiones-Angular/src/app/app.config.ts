import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RepositorioMisiones } from './core/dominio/repositorios/repositorio-misiones';
import { ApiMisionesRepositorio } from './core/infraestructura/repositorios/api-misiones.repositorio';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: RepositorioMisiones, useClass: ApiMisionesRepositorio },
  ],
};
