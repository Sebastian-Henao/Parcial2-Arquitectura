import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('alertState', 'loading');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the alert text', () => {
    fixture.componentRef.setInput('text', 'Cargando personajes...');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cargando personajes...');
  });
});
