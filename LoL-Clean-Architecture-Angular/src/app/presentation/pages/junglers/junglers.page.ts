import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetAllJunglersUseCase } from '../../../core/application/usecases/get-all-junglers.usecase';
import { GetJunglerByIdUseCase } from '../../../core/application/usecases/get-jungler-by-id.usecase';
import { GetJunglersByDifficultyUseCase } from '../../../core/application/usecases/get-junglers-by-difficulty.usecase';
import { Jungler } from '../../../core/domain/models/jungler.model';
import { JunglerRepository } from '../../../core/domain/repositories/jungler.repository';
import { JunglerApiRepositoryImpl } from '../../../core/infrastructure/repositories/jungler-api.repository.impl';

/** Página del catálogo y detalle de los campeones de jungla. */
@Component({
  selector: 'app-junglers-page',
  standalone: true,
  imports: [FormsModule],
  providers: [
    GetAllJunglersUseCase,
    GetJunglerByIdUseCase,
    GetJunglersByDifficultyUseCase,
    { provide: JunglerRepository, useClass: JunglerApiRepositoryImpl },
  ],
  template: `
    <main class="catalog">
      <header class="hero">
        <p class="eyebrow">LEAGUE OF LEGENDS · GUÍA DE CAMPEONES</p>
        <h1>Los <span>Junglers</span></h1>
        <p class="intro">Explora campeones, descubre sus estilos y encuentra tu próximo pick.</p>
      </header>

      <section class="toolbar" aria-label="Filtros de campeones">
        <label>
          <span>Clase</span>
          <select [(ngModel)]="selectedRole" (ngModelChange)="loadJunglers()">
            <option value="">Todas las clases</option>
            @for (role of roles; track role) {
              <option [value]="role">{{ role }}</option>
            }
          </select>
        </label>
        <label>
          <span>Dificultad</span>
          <select [(ngModel)]="selectedDifficulty" (ngModelChange)="filterByDifficulty()">
            <option value="">Todas</option>
            <option value="1">Baja</option>
            <option value="2">Moderada</option>
            <option value="3">Alta</option>
          </select>
        </label>
        <p class="count">{{ junglers.length }} campeones</p>
      </section>

      @if (loading) {
        <p class="feedback" role="status">Cargando campeones...</p>
      } @else if (errorMessage) {
        <div class="feedback error" role="alert">
          <p>{{ errorMessage }}</p>
          <button type="button" (click)="loadJunglers()">Reintentar</button>
        </div>
      } @else if (junglers.length === 0) {
        <p class="feedback">No se encontraron campeones con estos filtros.</p>
      } @else {
        <section class="grid" aria-label="Campeones de la jungla">
          @for (jungler of junglers; track jungler.id) {
            <article class="card" [class.selected]="selectedJungler?.id === jungler.id">
              <button class="card-action" type="button" (click)="showDetails(jungler.id)"
                [attr.aria-label]="'Ver detalle de ' + jungler.name">
                <span class="card-index">{{ jungler.id.toString().padStart(2, '0') }}</span>
                <span class="role">{{ jungler.role }}</span>
                <h2>{{ jungler.name }}</h2>
                <p class="title">{{ jungler.title }}</p>
                <span class="card-meta">{{ jungler.region }} <span>·</span> {{ difficultyName(jungler.difficulty) }}</span>
              </button>
            </article>
          }
        </section>
      }

      @if (selectedJungler; as selected) {
        <section class="detail" aria-label="Detalle del campeón">
          <button class="close" type="button" (click)="selectedJungler = null" aria-label="Cerrar detalle">×</button>
          <p class="eyebrow">DETALLE DEL CAMPEÓN</p>
          <h2>{{ selected.name }} <span>{{ selected.title }}</span></h2>
          <p>{{ selected.description }}</p>
          <dl>
            <div><dt>Clase</dt><dd>{{ selected.role }}</dd></div>
            <div><dt>Región</dt><dd>{{ selected.region }}</dd></div>
            <div><dt>Dificultad</dt><dd>{{ difficultyName(selected.difficulty) }}</dd></div>
            <div><dt>Daño</dt><dd>{{ selected.damageType }}</dd></div>
          </dl>
          <p class="abilities"><strong>Habilidades:</strong> {{ selected.abilities.join(' · ') }}</p>
        </section>
      }
      <footer>Información consultada desde el microservicio MS-LoL-SPRING · Puerto 3004</footer>
    </main>
  `,
  styles: [`
    :host { display: block; color: #f4f0e6; }
    .catalog { width: min(1120px, calc(100% - 40px)); margin: 0 auto; padding: 58px 0 32px; }
    .hero { text-align: center; margin: 12px auto 38px; }
    .eyebrow { color: #c89b3c; font-size: .7rem; font-weight: 800; letter-spacing: .2em; }
    h1 { margin: 12px 0; font-family: Georgia, serif; font-size: clamp(2.8rem, 7vw, 5rem); letter-spacing: -.04em; }
    h1 span { color: #c89b3c; }
    .intro { color: #a9b2c2; font-size: 1rem; }
    .toolbar { display: flex; align-items: end; gap: 14px; padding: 17px 0; margin-bottom: 20px; border-top: 1px solid #263346; border-bottom: 1px solid #263346; }
    label { display: grid; gap: 7px; color: #a9b2c2; font-size: .76rem; }
    select { min-width: 165px; padding: 10px 34px 10px 12px; border: 1px solid #344258; border-radius: 6px; background: #101a28; color: #f4f0e6; }
    .count { margin: 0 0 10px auto; color: #a9b2c2; font-size: .85rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; }
    .card { min-height: 175px; overflow: hidden; border: 1px solid #263346; border-radius: 8px; background: linear-gradient(145deg, #111c2b, #0d1420); transition: border-color .2s, transform .2s; }
    .card:hover, .card.selected { transform: translateY(-2px); border-color: #c89b3c; }
    .card-action { position: relative; display: flex; width: 100%; height: 100%; min-height: 175px; flex-direction: column; align-items: start; padding: 19px; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; }
    .card-index { position: absolute; top: 12px; right: 15px; color: #526176; font: 700 1.4rem Georgia, serif; }
    .role { padding: 4px 8px; border: 1px solid #405168; border-radius: 20px; color: #8eb8d9; font-size: .67rem; }
    h2 { margin: 17px 0 2px; font: 700 1.4rem Georgia, serif; }
    .title { margin: 0; color: #a9b2c2; font-size: .83rem; }
    .card-meta { margin-top: auto; padding-top: 15px; color: #c89b3c; font-size: .73rem; }
    .feedback { padding: 36px 10px; color: #a9b2c2; text-align: center; }
    .error { color: #ffaaa4; }
    .error button { padding: 8px 14px; border: 1px solid #c89b3c; border-radius: 5px; background: transparent; color: #e9c56a; cursor: pointer; }
    .detail { position: relative; margin-top: 28px; padding: 28px; border: 1px solid #c89b3c; border-radius: 8px; background: #101a28; }
    .detail h2 { margin: 10px 0 14px; font-size: 2rem; }
    .detail h2 span { color: #a9b2c2; font-size: 1.05rem; font-weight: 400; }
    .detail > p:not(.eyebrow) { max-width: 750px; color: #c4cbd5; line-height: 1.65; }
    .close { position: absolute; top: 12px; right: 16px; border: 0; background: transparent; color: #a9b2c2; font-size: 1.8rem; cursor: pointer; }
    dl { display: flex; flex-wrap: wrap; gap: 26px; margin: 22px 0; }
    dl div { min-width: 95px; }
    dt { color: #8c9aab; font-size: .72rem; }
    dd { margin: 4px 0 0; color: #e9c56a; }
    .abilities strong { color: #e9c56a; }
    footer { padding-top: 35px; color: #657286; font-size: .75rem; text-align: center; }
    @media (max-width: 560px) {
      .catalog { width: min(100% - 28px, 1120px); padding-top: 35px; }
      .toolbar { align-items: stretch; flex-direction: column; }
      select { width: 100%; }
      .count { margin: 0; text-align: right; }
      .detail { padding: 22px 17px; }
    }
  `],
})
export class JunglersPage implements OnInit {
  private readonly getAllUseCase = inject(GetAllJunglersUseCase);
  private readonly getByIdUseCase = inject(GetJunglerByIdUseCase);
  private readonly getByDifficultyUseCase = inject(GetJunglersByDifficultyUseCase);

  readonly roles = ['Asesino', 'Luchador', 'Mago', 'Tanque', 'Tirador'];
  junglers: Jungler[] = [];
  selectedJungler: Jungler | null = null;
  selectedRole = '';
  selectedDifficulty = '';
  loading = false;
  errorMessage = '';

  /** Carga el catálogo al montar la página. */
  ngOnInit(): void {
    this.loadJunglers();
  }

  /** Recupera la lista de campeones de acuerdo con los filtros activos. */
  loadJunglers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.selectedJungler = null;
    const request = this.selectedRole
      ? this.getAllUseCase.execute(this.selectedRole)
      : this.getAllUseCase.execute();
    request.subscribe({
      next: (junglers) => {
        this.junglers = junglers;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No fue posible cargar los campeones. Verifica que el microservicio esté activo en el puerto 3004.';
      },
    });
  }

  /** Consulta el filtro de dificultad directamente mediante su caso de uso. */
  filterByDifficulty(): void {
    if (!this.selectedDifficulty) {
      this.loadJunglers();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.selectedJungler = null;
    this.getByDifficultyUseCase.execute(Number(this.selectedDifficulty)).subscribe({
      next: (junglers) => {
        this.junglers = junglers;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No fue posible filtrar los campeones. Inténtalo de nuevo.';
      },
    });
  }

  /** Carga los datos completos del campeón seleccionado. */
  showDetails(id: number): void {
    this.getByIdUseCase.execute(id).subscribe({
      next: (jungler) => {
        this.selectedJungler = jungler;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar el detalle del campeón.';
      },
    });
  }

  /** Devuelve el nombre legible para el nivel de dificultad del dominio. */
  difficultyName(level: number): string {
    switch (level) {
      case 1:
        return 'Baja';
      case 2:
        return 'Moderada';
      case 3:
        return 'Alta';
      default:
        return 'Desconocida';
    }
  }
}
