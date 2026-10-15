import { Component, Input } from '@angular/core';
import { IconAtom } from '@brejcha13320/design-system-bootstrap';
import { AlertState } from '../../interfaces/state.interface';

/**
 * Componente reutilizable para mostrar estados de operación.
 *
 * Asocia cada estado con una clase CSS y un icono para comunicar errores,
 * cargas y resultados exitosos.
 */
@Component({
  selector: 'app-alert',
  imports: [IconAtom],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  /** Estado que determina el aspecto y el icono de la alerta. */
  @Input({ required: true }) alertState!: AlertState;

  /** Mensaje visible dentro de la alerta. */
  @Input()   text = '';

  /** Clases de estilo asociadas a cada estado de alerta. */
  alertClassMap: Record<AlertState, 'primary' | 'danger' | 'success'> = {
    error: 'danger',
    loading: 'primary',
    success: 'success',
  };

  /** Nombres de icono asociados a cada estado de alerta. */
  alertIconMap: Record<AlertState, string> = {
    error: 'exclamation-triangle-fill',
    loading: 'hourglass-split',
    success: 'check-circle-fill',
  };

  /**
   * Construye las clases CSS que representan el estado actual.
   *
   * @returns Clases CSS para el contenedor de la alerta.
   */
  getClass(): string {
    return `alert alert-${this.alertClassMap[this.alertState]} d-flex align-items-center`;
  }
}
