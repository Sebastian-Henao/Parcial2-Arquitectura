import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesPage } from './personajes.page';
import { PersonajeRepository } from '../../core/domain/repositories/personaje.repository';

describe('PersonajesPage', () => {
  let component: PersonajesPage;
  let fixture: ComponentFixture<PersonajesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajesPage],
      providers: [
        {
          provide: PersonajeRepository,
          useValue: {
            getAll: async () => [],
            getById: async () => null,
            addFavorite: async () => undefined,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
