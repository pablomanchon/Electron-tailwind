import type { CreateMovimientoDto, UpdateMovimientoDto } from "../types/movimiento.dto";

export const isPriceOkay = (data: CreateMovimientoDto | UpdateMovimientoDto) => {
    const totalMetodosPago = data.metodosPago?.reduce((acc, m) => acc + m.monto, 0);
    return data.monto === totalMetodosPago
}