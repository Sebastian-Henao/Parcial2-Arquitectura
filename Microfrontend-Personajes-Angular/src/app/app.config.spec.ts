import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';
import { PersonajeRepository } from './core/domain/repositories/personaje.repository';
import { PersonajeNodeRepositoryImpl } from './core/infraestructure/repositories/personaje-node.repository.impl';

describe('appConfig', () => {
  it('provides the HTTP repository implementation to the application', () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    });

    expect(TestBed.inject(PersonajeRepository)).toBeInstanceOf(PersonajeNodeRepositoryImpl);
  });
});
