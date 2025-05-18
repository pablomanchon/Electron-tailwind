export interface UpdateMovimientoDto {
  tipo?: 'entrada' | 'salida';
  monto?: number;
  descripcion?: string;
  fecha?: string;
  metodoPagoId?: number;
  categoriaId?: number;
}
