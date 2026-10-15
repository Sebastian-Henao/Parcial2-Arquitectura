import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Personaje, RolCategoria } from '../../../core/domain/models/personaje.model';

/**
 * Componente de presentación que muestra personajes en una tabla.
 *
 * Usa una insignia visual cuyo tipo depende del rol de cada personaje.
 */
@Component({
  selector: 'app-personajes-table',
  imports: [BadgeAtom],
  templateUrl: './personajes-table.component.html',
})
export class PersonajesTableComponent {
  /** Personajes que se deben presentar en la tabla. */
  @Input() personajes: Personaje[] = [];

  /** Tipos de insignia visual asociados a cada categoría de rol. */
  categoryMap: Record<RolCategoria, BadgeType> = {
    'Vanguardia': 'primary',
    'Ladron': 'dark',
    'Jefe': 'danger',
    'Ilusionista': 'info',
    'Explorador': 'success',
  }
}
