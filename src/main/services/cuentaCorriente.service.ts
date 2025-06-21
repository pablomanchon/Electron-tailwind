// src/services/cuenta-corriente.service.ts
import { CuentaCorriente } from '../database/entities/CuentaCorriente'
import { CuentaCorrienteDto } from '../dtos/cCte.dto'
import { CuentaCorrienteRepository } from '../repositories/cuentaCorriente.repository'
import { toCuentaCorrienteDto } from '../utils/toCtaCteDto'

export class CuentaCorrienteService {
  constructor(private readonly repo: CuentaCorrienteRepository) { }

  async crearCuenta(cuenta: Partial<CuentaCorriente>): Promise<CuentaCorrienteDto> {
    const nueva = new CuentaCorriente()
    Object.assign(nueva, cuenta)
    nueva.saldo ??= 0
    nueva.isDeleted = false
    const saved = await this.repo.save(nueva)
    return toCuentaCorrienteDto(saved)
  }

  async obtenerTodas(): Promise<CuentaCorrienteDto[]> {
    const cuentas = await this.repo.findAll()
    return cuentas.map(toCuentaCorrienteDto)
  }

  async obtenerPorId(id: number): Promise<CuentaCorrienteDto | null> {
    const cuenta = await this.repo.findById(id)
    return cuenta ? toCuentaCorrienteDto(cuenta) : null
  }

  async obtenerEntidadPorId(id: number): Promise<CuentaCorriente | null> {
    const cuenta = await this.repo.findById(id);
    return cuenta;
  }

  async actualizar(id: number, data: Partial<CuentaCorriente>): Promise<CuentaCorrienteDto> {
    const cuenta = await this.repo.findById(id)
    if (!cuenta) throw new Error('Cuenta no encontrada')
    Object.assign(cuenta, data)
    const updated = await this.repo.save(cuenta)
    return toCuentaCorrienteDto(updated)
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.softDelete(id)
  }
}
