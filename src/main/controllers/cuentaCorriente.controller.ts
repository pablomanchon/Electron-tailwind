// src/controllers/cuenta-corriente.controller.ts
import { Request, Response } from 'express'
import { CuentaCorrienteService } from '../services/cuentaCorriente.service'
import { CuentaCorrienteRepository } from '../repositories/cuentaCorriente.repository'

export class CuentaCorrienteController {
  private servicio: CuentaCorrienteService

  constructor() {
    this.servicio = new CuentaCorrienteService(new CuentaCorrienteRepository())
  }

  async crear(req: Request, res: Response): Promise<Response> {
    try {
      const cuenta = await this.servicio.crearCuenta(req.body)
      return res.status(201).json(cuenta) // ✅ Retorna CuentaCorrienteDto
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async listar(_req: Request, res: Response): Promise<Response> {
    try {
      const cuentas = await this.servicio.obtenerTodas()
      return res.json(cuentas) // ✅ Retorna CuentaCorrienteDto[]
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<Response> {
    try {
      const cuenta = await this.servicio.obtenerPorId(+req.params.id)
      if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' })
      return res.json(cuenta) // ✅ Retorna CuentaCorrienteDto
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async actualizar(req: Request, res: Response): Promise<Response> {
    try {
      const cuenta = await this.servicio.actualizar(+req.params.id, req.body)
      return res.json(cuenta) // ✅ Retorna CuentaCorrienteDto
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async eliminar(req: Request, res: Response): Promise<Response> {
    try {
      await this.servicio.eliminar(+req.params.id)
      return res.status(204).send() // ✅ No retorna contenido
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}
