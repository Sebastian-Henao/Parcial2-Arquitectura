import { Component } from '@angular/core';
import { PaginaCentralMisiones } from './presentacion/paginas/central-misiones/central-misiones.pagina';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaginaCentralMisiones],
  template: '<app-pagina-central-misiones />',
})
export class App {}
