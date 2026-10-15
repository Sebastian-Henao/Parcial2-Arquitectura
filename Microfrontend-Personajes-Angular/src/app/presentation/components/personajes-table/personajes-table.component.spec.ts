import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesTableComponent } from './personajes-table.component';

describe('PersonajesTableComponent', () => {
  let component: PersonajesTableComponent;
  let fixture: ComponentFixture<PersonajesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
