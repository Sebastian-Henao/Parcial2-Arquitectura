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

  @Input() text: string = "";

  alertClassMap: Record<AlertState, 'primary' | 'danger'> = {
    error: 'danger',
    loading: 'primary',
  };

  getClass(): string {
    return `alert alert-${this.alertClassMap[this.alertState]} d-flex align-items-center`;
  }
}
