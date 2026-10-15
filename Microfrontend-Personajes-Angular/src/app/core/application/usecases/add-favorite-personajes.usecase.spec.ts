import { TestBed } from '@angular/core/testing';

import { AddFavoritePersonajesUsecase } from './add-favorite-personajes.usecase';

describe('AddFavoritePersonajesUsecase', () => {
  let service: AddFavoritePersonajesUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFavoritePersonajesUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
