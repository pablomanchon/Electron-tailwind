import { MetodoPago } from '../enums/MetodoPagoEnum';
import { TipoMovimiento } from '../enums/MovimientoEnum';

export function esMetodoPagoValido(valor: any): valor is MetodoPago {
    return Object.values(MetodoPago).includes(valor as MetodoPago);
}

export function esTipoMovimientoValido(valor: any): valor is TipoMovimiento {
    return Object.values(TipoMovimiento).includes(valor as TipoMovimiento);
}
