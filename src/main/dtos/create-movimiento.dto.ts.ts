export interface CreateMovimientoDto {
  tipo: 'entrada' | 'salida';
  monto: number;
  descripcion?: string;
  fecha: string; // ISO date string
  metodoPagoId: number;
  categoriaId?: number;
}
