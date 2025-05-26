import { MetodoPago } from "../enums/MetodoPagoEnum";

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
