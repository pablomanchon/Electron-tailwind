import { Request, Response } from 'express';
import { MovimientoService } from '../services/movimiento.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from '../dtos/movimiento.dto';
import { AppDataSource } from '../database/data-source';
import { Movimiento } from '../database/entities/Movimiento';
import { MovimientoMetodoPago } from '../database/entities/MovimientoMetodoPago';
import { CuentaCorriente } from '../database/entities/CuentaCorriente';

export class MovimientoController {
  private servicio: MovimientoService;

  constructor() {
    this.servicio = new MovimientoService(
      AppDataSource.getRepository(Movimiento),
      AppDataSource.getRepository(MovimientoMetodoPago),
      AppDataSource.getRepository(CuentaCorriente)
    );
  }

  async crear(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateMovimientoDto = req.body;
      const movimiento = await this.servicio.crearMovimiento(data);
      return res.status(201).json(movimiento);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async listar(_req: Request, res: Response): Promise<Response> {
    try {
      const movimientos = await this.servicio.obtenerMovimientos();
      return res.json(movimientos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<Response> {
    try {
      const movimiento = await this.servicio.obtenerMovimientoPorId(+req.params.id);
      if (!movimiento) return res.status(404).json({ message: 'Movimiento no encontrado' });
      return res.json(movimiento);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<Response> {
    try {
      const data: UpdateMovimientoDto = req.body;
      const movimiento = await this.servicio.actualizarMovimiento(+req.params.id, data);
      return res.json(movimiento);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async eliminar(req: Request, res: Response): Promise<Response> {
    try {
      const eliminado = await this.servicio.eliminarMovimiento(+req.params.id);
      if (!eliminado) return res.status(404).json({ message: 'Movimiento no encontrado' });
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
