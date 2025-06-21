import { Movimiento } from "../database/entities/Movimiento";
import { MetodoPago } from "../enums/MetodoPagoEnum";
import { TipoMovimiento } from "../enums/MovimientoEnum";

export interface MetodoPagoDto {
  metodo: MetodoPago;
  monto: number;
}

export interface MovimientoMetodoPagoDto {
  id: number;
  metodo: MetodoPago;
  monto: number;
}

export interface MovimientoDto {
  id: number;
  cuentaCorrienteId: number;
  fecha: Date;
  tipo: TipoMovimiento;
  monto: number;
  descripcion: string;
  categoria: string;
  metodosPago: MovimientoMetodoPagoDto[];
}

export interface CreateMovimientoDto {
  tipo: TipoMovimiento;
  monto: number;
  descripcion?: string;
  categoria?: string;
  cuentaCorrienteId: number;
  metodosPago: MetodoPagoDto[];
}

export interface UpdateMovimientoDto {
  tipo?: TipoMovimiento;
  monto?: number;
  descripcion?: string;
  categoria?: string;
  cuentaCorrienteId?: number;
  fecha?: Date;
  metodosPago?: MetodoPagoDto[];
}



export function mapMovimientoToDto(m: Movimiento): MovimientoDto {
  return {
    id: m.id,
    cuentaCorrienteId: m.cuentaCorriente.id,
    fecha: m.fecha,
    tipo: m.tipo as TipoMovimiento,
    monto: m.monto,
    descripcion: m.descripcion,
    categoria: m.categoria,
    metodosPago: m.metodosPago.map((mp) => ({
      id: mp.id,
      metodo: mp.metodo as MetodoPago,
      monto: mp.monto,
    })),
  };
}

