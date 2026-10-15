import { TestBed } from '@angular/core/testing';

import { PersonajeNodeRepositoryImpl } from './personaje-node.repository.impl';

describe('PersonajeNodeRepositoryImpl', () => {
  let service: PersonajeNodeRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonajeNodeRepositoryImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
