// src/utils/toCuentaCorrienteDto.ts
import { CuentaCorriente } from '../database/entities/CuentaCorriente'
import { CuentaCorrienteDto } from '../dtos/cCte.dto'

export function toCuentaCorrienteDto(cuenta: CuentaCorriente): CuentaCorrienteDto {
  const usuario = cuenta.usuario
    ? {
        id: cuenta.usuario.id,
        nombre: cuenta.usuario.nombre,
        tipo: cuenta.usuario.tipo,
        telefono: cuenta.usuario.telefono,
        email: cuenta.usuario.email,
        cuentaCorrienteId: cuenta.usuario.cuentaCorriente?.id, // opcional
      }
    : undefined

  return {
    id: cuenta.id,
    saldo: Number(cuenta.saldo),
    usuario: usuario!,
  }
}
