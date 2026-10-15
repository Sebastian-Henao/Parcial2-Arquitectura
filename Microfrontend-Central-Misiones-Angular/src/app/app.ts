import { Component } from '@angular/core';
import { PaginaCentralMisiones } from './presentation/pages/central-misiones/central-misiones.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaginaCentralMisiones],
  template: '<app-pagina-central-misiones />',
})
export class App {}
