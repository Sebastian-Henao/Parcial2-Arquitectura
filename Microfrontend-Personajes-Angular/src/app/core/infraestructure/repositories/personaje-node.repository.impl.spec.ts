import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PersonajeNodeRepositoryImpl } from './personaje-node.repository.impl';
import { DataService } from '../services/data.service';

describe('PersonajeNodeRepositoryImpl', () => {
  let service: PersonajeNodeRepositoryImpl;
  let dataService: {
    getAllPersonajeNode: jest.Mock;
    getPersonajesByIdNode: jest.Mock;
    getPersonajesByRoleNode: jest.Mock;
  };

  beforeEach(() => {
    dataService = {
      getAllPersonajeNode: jest.fn().mockReturnValue(of([])),
      getPersonajesByIdNode: jest.fn().mockReturnValue(of(null)),
      getPersonajesByRoleNode: jest.fn().mockReturnValue(of([])),
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

  it('adapts the role request to a promise', async () => {
    await expect(service.getByRole('Vanguardia')).resolves.toEqual([]);
    expect(dataService.getPersonajesByRoleNode).toHaveBeenCalledWith('Vanguardia');
  });
});
