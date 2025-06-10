// enums/MetodoPago.ts
export enum MetodoPago {
  EFECTIVO = "Efectivo",
  DEBITO = "Débito",
  CREDITO = "Crédito",
  MERCADO_PAGO = "Mercado Pago",
  DOLAR = "Dólar",
  PENDIENTE = "Pendiente",
}

export function esMetodoPagoValido(valor: any): valor is MetodoPago {
  return Object.values(MetodoPago).includes(valor);
}
