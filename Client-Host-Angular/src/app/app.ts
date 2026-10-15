import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarConfig, NavbarOrganism } from '@brejcha13320/design-system-bootstrap';

/** Shell de navegación que integra los microfrontends del monorepositorio. */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, NavbarOrganism],
})
export class App {
  /** Elementos de navegación del Host. */
  readonly navbarConfig: NavbarConfig = {
    title: 'Parcial II · Arquitectura',
    iconConfig: { icon: 'bootstrap', size: 2 },
    navLinks: [{ text: 'LoL · Junglers', url: '/lol' }],
  };
}
