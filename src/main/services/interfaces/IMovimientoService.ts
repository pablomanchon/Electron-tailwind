import { CreateMovimientoDto, UpdateMovimientoDto } from '../../dtos/movimiento.dto';
import { Movimiento } from '../../database/entities/Movimiento';

export interface IMovimientoReader {
  obtenerMovimientos(): Promise<Movimiento[]>;
  obtenerMovimientoPorId(id: number): Promise<Movimiento | null>;
}

export interface IMovimientoWriter {
  crearMovimiento(data: CreateMovimientoDto): Promise<Movimiento>;
  actualizarMovimiento(id: number, data: UpdateMovimientoDto): Promise<Movimiento>;
  eliminarMovimiento(id: number): Promise<boolean>;
}
