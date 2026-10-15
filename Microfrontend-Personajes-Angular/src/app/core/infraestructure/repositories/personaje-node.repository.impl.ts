import { inject, Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { firstValueFrom } from 'rxjs';
import { Personaje } from '../../domain/models/personaje.model';
import { PersonajeRepository } from '../../domain/repositories/personaje.repository';

/**
 * Adaptador HTTP que implementa el puerto de dominio de personajes.
 *
 * Convierte los observables de Angular HttpClient en promesas para conservar
 * el contrato esperado por la capa de aplicación.
 */
@Injectable()
export class PersonajeNodeRepositoryImpl extends PersonajeRepository {
  /** Servicio de infraestructura que realiza las solicitudes HTTP. */
  private dataService = inject(DataService);

  /**
   * Obtiene una cantidad limitada de personajes desde el backend.
   *
   * @param countPersonajes Cantidad de personajes solicitada.
   * @returns Promesa con la lista recibida del servicio.
   */
  getAll(countPersonajes: number): Promise<Personaje[]> {
    return firstValueFrom(this.dataService.getAllPersonajeNode(countPersonajes));
  }

  /**
   * Consulta un personaje por ID en el backend.
   *
   * @param id Identificador numérico del personaje.
   * @returns Promesa con el personaje o `null` si no existe.
   */
  getById(id: number): Promise<Personaje | null> {
    return firstValueFrom(this.dataService.getPersonajesByIdNode(id));
  }

  /**
   * Consulta el backend para obtener personajes de un rol.
   *
   * @param rol Categoría de rol solicitada.
   * @returns Promesa con los personajes que coinciden con el rol.
   */
  getByRole(rol: string): Promise<Personaje[]> {
    return firstValueFrom(this.dataService.getPersonajesByRoleNode(rol));
  }
}
