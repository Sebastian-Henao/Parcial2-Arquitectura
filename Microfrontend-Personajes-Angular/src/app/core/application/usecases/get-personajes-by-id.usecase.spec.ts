import { TestBed } from '@angular/core/testing';

import { GetPersonajesByIdUsecase } from './get-personajes-by-id.usecase';

describe('GetPersonajesByIdUsecase', () => {
  let service: GetPersonajesByIdUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPersonajesByIdUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
