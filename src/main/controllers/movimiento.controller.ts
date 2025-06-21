import { Request, Response } from 'express';
import { MovimientoService } from '../services/movimiento.service';
import { CreateMovimientoDto, UpdateMovimientoDto } from '../dtos/movimiento.dto';
import { AppDataSource } from '../database/data-source';
import { Movimiento } from '../database/entities/Movimiento';

export class MovimientoController {
  private servicio: MovimientoService;

  constructor() {
    this.servicio = new MovimientoService(
      AppDataSource.getRepository(Movimiento),
      AppDataSource
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
      const movimientos = await this.servicio.obtenerMovimientos(); // ✅ Corregido
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
  
async obtenerPorCcIdYDia(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { fecha, skip = '0', take = '10' } = req.query;

  if (isNaN(id) || !fecha) return res.status(400).json({ message: 'Datos inválidos' });

  const dia = new Date(fecha as string);

  try {
    const movimientos = await this.servicio.obtenerPorCcIdYDia(
      id,
      dia,
      parseInt(skip as string),
      parseInt(take as string)
    );
    return res.json(movimientos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error al obtener movimientos por día' });
  }
}


async obtenerPorCcIdPaginado(req: Request, res: Response): Promise<Response> {
  const id = parseInt(req.params.id);
  const { skip = '0', take = '10' } = req.query;

  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const movimientos = await this.servicio.obtenerPorCcIdPaginado(
      id,
      parseInt(skip as string),
      parseInt(take as string)
    );
    return res.json(movimientos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Error al obtener movimientos paginados' });
  }
}

}
