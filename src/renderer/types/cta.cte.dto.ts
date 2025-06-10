import type { MovimientoDto } from "./movimiento.dto"
import type { UsuarioDto } from "./usuario.dto"

// Para representar una cuenta existente
export interface CuentaCorrienteDto {
  id: number
  saldo: number
  usuario: UsuarioDto
  isDeleted: boolean
}

export interface CtaCteWithMovesDto extends CuentaCorrienteDto {
  moves: MovimientoDto[];
}

// Para crear una nueva cuenta
export interface CreateCuentaCorrienteDto {
  saldo?: number
  usuario: UsuarioDto
}

// Para actualizar una cuenta existente
export interface UpdateCuentaCorrienteDto {
  saldo?: number
  usuario: UsuarioDto
  isDeleted?: boolean
}
