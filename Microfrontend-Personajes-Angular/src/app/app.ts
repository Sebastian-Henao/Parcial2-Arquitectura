import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la aplicación Angular.
 *
 * Aloja las páginas seleccionadas por el enrutador mediante `RouterOutlet`.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Nombre identificador de la aplicación. */
  protected readonly title = signal('Microfrontend-Personajes-Angular');
}
