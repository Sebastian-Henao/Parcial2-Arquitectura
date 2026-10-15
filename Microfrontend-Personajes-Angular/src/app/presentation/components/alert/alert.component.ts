import { Component, Input } from '@angular/core';
import { IconAtom } from '@brejcha13320/design-system-bootstrap';
import { AlertState } from '../../interfaces/state.interface';

@Component({
  selector: 'app-alert',
  imports: [IconAtom],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({ required: true }) alertState!: AlertState;

  @Input()   text = '';

  alertClassMap: Record<AlertState, 'primary' | 'danger' | 'success'> = {
    error: 'danger',
    loading: 'primary',
    success: 'success',
  };

  alertIconMap: Record<AlertState, string> = {
    error: 'exclamation-triangle-fill',
    loading: 'hourglass-split',
    success: 'check-circle-fill',
  };

  getClass(): string {
    return `alert alert-${this.alertClassMap[this.alertState]} d-flex align-items-center`;
  }
}
