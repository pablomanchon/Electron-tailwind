import { MetodoPago } from "../enums/MetodoPagoEnum";

export interface MetodoPagoDto {
  metodo: MetodoPago;
  monto: number;
}

export interface CreateMovimientoDto {
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
  fecha?: Date;
  metodosPago?: MetodoPagoDto[];
}
