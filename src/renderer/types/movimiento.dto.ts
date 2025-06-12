export interface MetodoPagoDto {
  metodo: MetodoPago;
  monto: number;
}

export interface CreateMovimientoDto {
  id: number;
  tipo: 'entrada' | 'salida';
  monto: number;
  descripcion?: string;
  categoria?: string;
  cuentaCorrienteId: number;
  metodosPago: MetodoPagoDto[];
}
export interface MovimientoDto {
  id: number;
  tipo: 'entrada' | 'salida';
  monto: number;
  descripcion?: string;
  categoria?: string;
  cuentaCorrienteId: number;
  metodosPago: MetodoPagoDto[];
}

export interface UpdateMovimientoDto {
  tipo?: 'entrada' | 'salida';
  monto?: number;
  descripcion?: string;
  categoria?: string;
  cuentaCorrienteId?: number;
  metodosPago?: MetodoPagoDto[];
}


export enum MetodoPago {
  EFECTIVO = "Efectivo",
  DEBITO = "Débito",
  CREDITO = "Crédito",
  MERCADO_PAGO = "Mercado Pago",
  DOLAR = "Dólar",
  PENDIENTE = "Pendiente",
}
