import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Personaje, RolCategoria } from '../../../core/domain/models/personaje.model';

@Component({
  selector: 'app-personajes-table',
  imports: [CommonModule, BadgeAtom],
  templateUrl: './personajes-table.component.html',
})
export class PersonajesTableComponent {
  @Input() personajes: Personaje[] = [];

  categoryMap: Record<RolCategoria, BadgeType> = {
    'Vanguardia': 'primary',
    'Ladron': 'dark',
    'Jefe': 'danger',
    'Ilusionista': 'info',
    'Explorador': 'success',
  }
}
