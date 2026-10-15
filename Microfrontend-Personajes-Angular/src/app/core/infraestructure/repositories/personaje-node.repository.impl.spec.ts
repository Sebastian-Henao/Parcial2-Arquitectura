import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PersonajeNodeRepositoryImpl } from './personaje-node.repository.impl';
import { DataService } from '../services/data.service';

describe('PersonajeNodeRepositoryImpl', () => {
  let service: PersonajeNodeRepositoryImpl;
  let dataService: {
    getAllPersonajeNode: jest.Mock;
    getPersonajesByIdNode: jest.Mock;
    addFavoritePersonajeNode: jest.Mock;
  };

  beforeEach(() => {
    dataService = {
      getAllPersonajeNode: jest.fn().mockReturnValue(of([])),
      getPersonajesByIdNode: jest.fn().mockReturnValue(of(null)),
      addFavoritePersonajeNode: jest.fn().mockReturnValue(of(void 0)),
    };

    TestBed.configureTestingModule({
      providers: [
        PersonajeNodeRepositoryImpl,
        { provide: DataService, useValue: dataService },
      ],
    });
    service = TestBed.inject(PersonajeNodeRepositoryImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adapts the list request to a promise', async () => {
    await expect(service.getAll(5)).resolves.toEqual([]);
    expect(dataService.getAllPersonajeNode).toHaveBeenCalledWith(5);
  });

  it('adapts the detail request to a promise', async () => {
    await expect(service.getById(3)).resolves.toBeNull();
    expect(dataService.getPersonajesByIdNode).toHaveBeenCalledWith(3);
  });

  it('adapts the favorite request to a promise', async () => {
    await expect(service.addFavorite(8)).resolves.toBeUndefined();
    expect(dataService.addFavoritePersonajeNode).toHaveBeenCalledWith(8);
  });
});
