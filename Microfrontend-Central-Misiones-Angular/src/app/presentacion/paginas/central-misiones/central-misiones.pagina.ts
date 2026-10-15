import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActualizarEstadoMisionCasoDeUso,
} from '../../../core/aplicacion/casos-de-uso/actualizar-estado-mision.caso-de-uso';
import {
  ObtenerMisionPorIdCasoDeUso,
} from '../../../core/aplicacion/casos-de-uso/obtener-mision-por-id.caso-de-uso';
import {
  ObtenerTodasMisionesCasoDeUso,
} from '../../../core/aplicacion/casos-de-uso/obtener-todas-misiones.caso-de-uso';
import {
  EstadoMision,
  esEstadoMision,
  estadosMision,
  Mision,
} from '../../../core/dominio/modelos/mision.modelo';

@Component({
  selector: 'app-pagina-central-misiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="pagina-misiones">
      <header class="encabezado-pagina">
        <div>
          <p class="eyebrow">Centro de operaciones</p>
          <h1>Central de Misiones</h1>
          <p>Coordina operaciones y supervisa su avance.</p>
        </div>
        <button class="boton-actualizar" type="button" (click)="cargarMisiones()">
          Actualizar misiones
        </button>
      </header>

      <p class="notice" role="status" *ngIf="mensaje()">{{ mensaje() }}</p>
      <p class="loading" *ngIf="cargando()">Cargando misiones...</p>

      <section class="distribucion-misiones" aria-label="Gestión de misiones">
        <div class="lista-misiones">
          <h2>Operaciones activas</h2>
          <p class="estado-vacio" *ngIf="!cargando() && misiones().length === 0">
            No hay misiones disponibles.
          </p>
          <article class="tarjeta-mision" *ngFor="let mision of misiones()">
            <div class="encabezado-tarjeta">
              <h3>{{ mision.titulo }}</h3>
              <span class="amenaza">Amenaza {{ mision.nivelAmenaza }}/5</span>
            </div>
            <p>{{ mision.ubicacion }}</p>
            <span class="estado">{{ mision.estado }}</span>
            <button type="button" (click)="consultarMision(mision.id)">Ver detalle</button>
          </article>
        </div>

        <aside class="detalle-mision" aria-label="Detalle de misión" *ngIf="misionSeleccionada() as mision">
          <p class="eyebrow">Detalle de operación</p>
          <h2>{{ mision.titulo }}</h2>
          <p>{{ mision.resumen }}</p>
          <dl>
            <div><dt>Ubicación</dt><dd>{{ mision.ubicacion }}</dd></div>
            <div><dt>Nivel de amenaza</dt><dd>{{ mision.nivelAmenaza }}/5</dd></div>
            <div><dt>Equipo asignado</dt><dd>{{ mision.equipoAsignado || 'Sin asignar' }}</dd></div>
          </dl>
          <label for="estado-mision">Estado de misión</label>
          <select
            id="estado-mision"
            [ngModel]="estadoSeleccionado()"
            (ngModelChange)="cambiarEstado($event)"
          >
            <option *ngFor="let estado of estadosDisponibles" [value]="estado">{{ estado }}</option>
          </select>
          <button type="button" (click)="guardarEstado()">Guardar estado</button>
        </aside>
      </section>
    </main>
  `,
  styles: [
    `
      .pagina-misiones {
        max-width: 76rem;
        margin: 0 auto;
        padding: 2rem 1.5rem 4rem;
      }

      .encabezado-pagina,
      .encabezado-tarjeta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      h1,
      h2,
      h3,
      p {
        margin-top: 0;
      }

      h1 {
        margin-bottom: 0.5rem;
        font-size: clamp(2rem, 5vw, 3.5rem);
      }

      h2 {
        margin-bottom: 1rem;
      }

      .distribucion-misiones {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.8fr);
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .tarjeta-mision,
      .detalle-mision {
        padding: 1.25rem;
        border: 1px solid #25354b;
        border-radius: 1rem;
        background: #101c2e;
      }

      .tarjeta-mision + .tarjeta-mision {
        margin-top: 0.75rem;
      }

      .tarjeta-mision p,
      .detalle-mision p {
        color: #b6c3d4;
      }

      .amenaza,
      .estado {
        color: #8be9fd;
        font-size: 0.85rem;
      }

      button,
      select {
        border: 1px solid #3e5875;
        border-radius: 0.5rem;
        background: #17283d;
        color: #f4f7fb;
        font: inherit;
        padding: 0.6rem 0.8rem;
      }

      button {
        cursor: pointer;
      }

      .tarjeta-mision button {
        display: block;
        margin-top: 0.8rem;
      }

      .detalle-mision dl {
        display: grid;
        gap: 0.8rem;
      }

      .detalle-mision dt {
        color: #8ea3bc;
        font-size: 0.8rem;
      }

      .detalle-mision dd {
        margin: 0.2rem 0 0;
      }

      .detalle-mision label,
      .detalle-mision select {
        display: block;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 0.7rem;
      }

      .notice,
      .estado-vacio,
      .loading {
        margin-top: 1rem;
        color: #ffcf70;
      }

      .eyebrow {
        color: #8be9fd;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      @media (max-width: 760px) {
        .encabezado-pagina {
          align-items: flex-start;
          flex-direction: column;
        }

        .distribucion-misiones {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PaginaCentralMisiones implements OnInit {
  readonly estadosDisponibles = estadosMision;
  readonly misiones = signal<Mision[]>([]);
  readonly misionSeleccionada = signal<Mision | null>(null);
  readonly estadoSeleccionado = signal<EstadoMision>('disponible');
  readonly mensaje = signal('');
  readonly cargando = signal(false);

  constructor(
    private readonly obtenerTodasMisiones: ObtenerTodasMisionesCasoDeUso,
    private readonly obtenerMisionPorId: ObtenerMisionPorIdCasoDeUso,
    private readonly actualizarEstadoMision: ActualizarEstadoMisionCasoDeUso,
  ) {}

  ngOnInit(): void {
    this.cargarMisiones();
  }

  cargarMisiones(): void {
    this.cargando.set(true);
    this.mensaje.set('');
    this.obtenerTodasMisiones.ejecutar().subscribe({
      next: (misiones) => this.misiones.set(misiones),
      error: () => {
        this.mensaje.set('No fue posible cargar las misiones. Verifica que la API esté activa.');
        this.cargando.set(false);
      },
      complete: () => this.cargando.set(false),
    });
  }

  consultarMision(id: string): void {
    this.mensaje.set('');
    this.obtenerMisionPorId.ejecutar(id).subscribe({
      next: (mision) => {
        this.misionSeleccionada.set(mision);
        this.estadoSeleccionado.set(mision.estado);
      },
      error: () => this.mensaje.set('No fue posible consultar el detalle de la misión.'),
    });
  }

  cambiarEstado(estado: unknown): void {
    if (esEstadoMision(estado)) {
      this.estadoSeleccionado.set(estado);
    }
  }

  guardarEstado(): void {
    const mision = this.misionSeleccionada();
    if (!mision) {
      return;
    }

    this.mensaje.set('');
    this.actualizarEstadoMision.ejecutar(mision.id, this.estadoSeleccionado()).subscribe({
      next: (misionActualizada) => {
        this.misionSeleccionada.set(misionActualizada);
        this.misiones.update((misiones) =>
          misiones.map((item) => (item.id === misionActualizada.id ? misionActualizada : item)),
        );
        this.mensaje.set('Estado de la misión actualizado.');
      },
      error: () => this.mensaje.set('No fue posible actualizar el estado de la misión.'),
    });
  }
}
