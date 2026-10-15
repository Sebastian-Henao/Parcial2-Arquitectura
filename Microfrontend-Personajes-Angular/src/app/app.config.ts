import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PersonajeRepository } from './core/domain/repositories/personaje.repository';
import { PersonajeNodeRepositoryImpl } from './core/infraestructure/repositories/personaje-node.repository.impl';
import { provideHttpClient } from '@angular/common/http';

/**
 * Configuración raíz de Angular para la aplicación.
 *
 * Registra el adaptador HTTP detrás del contrato de dominio, el enrutador
 * y los proveedores globales que necesita la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [

    { provide: PersonajeRepository, useClass: PersonajeNodeRepositoryImpl },

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(),
  ]
};
