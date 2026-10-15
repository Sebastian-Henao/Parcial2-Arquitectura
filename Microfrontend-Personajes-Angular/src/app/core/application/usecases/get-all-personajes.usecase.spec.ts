import { TestBed } from '@angular/core/testing';

import { GetAllPersonajesUsecase } from './get-all-personajes.usecase';

describe('GetAllPersonajesUsecase', () => {
  let service: GetAllPersonajesUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPersonajesUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
