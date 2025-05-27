export interface MetodoPagoDto {
  metodo: MetodoPago;
  monto: number;
}

export interface CreateMovimientoDto {
  tipo: 'entrada' | 'salida';
  monto: number;
  descripcion?: string;
  fecha: string;
  categoriaId?: number;
  usuarioId: number;
  metodosPago: MetodoPagoDto[];
}

export interface UpdateMovimientoDto {
  tipo?: 'entrada' | 'salida';
  monto?: number;
  descripcion?: string;
  fecha?: string;
  categoriaId?: number;
  usuarioId?: number;
  metodosPago?: MetodoPagoDto[];
}

export enum MetodoPago {
  EFECTIVO = "Efectivo",
  DEBITO = "Débito",
  CREDITO = "Crédito",
  MERCADO_PAGO = "Mercado PAgo",
  DOLAR = "Dólar",
  PENDIENTE = "Pendiente",
}
