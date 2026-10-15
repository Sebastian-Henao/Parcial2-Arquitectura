import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Raíz del MFE standalone; delega la vista al enrutador de la aplicación. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}
