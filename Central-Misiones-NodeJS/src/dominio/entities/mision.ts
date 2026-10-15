export const estadosMision = ['disponible', 'en-curso', 'completada'] as const;

export type EstadoMision = (typeof estadosMision)[number];

export interface Mision {
  id: string;
  titulo: string;
  resumen: string;
  ubicacion: string;
  nivelAmenaza: 1 | 2 | 3 | 4 | 5;
  estado: EstadoMision;
  equipoAsignado: string | null;
}
