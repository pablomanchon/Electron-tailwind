import { Request, Response } from 'express';
import { MetodoPagoService } from '../services/metodoPago.service';
import { CreateMetodoPagoDto } from '../dtos/create-metodo-pago.dto';

export class MetodoPagoController {
  private servicio = new MetodoPagoService();

  async crear(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateMetodoPagoDto = req.body;
      const metodo = await this.servicio.crearMetodoPago(data);
      return res.status(201).json(metodo);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async listar(_req: Request, res: Response): Promise<Response> {
    try {
      const metodos = await this.servicio.obtenerMetodosPago();
      return res.json(metodos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<Response> {
    try {
      const metodo = await this.servicio.obtenerMetodoPagoPorId(+req.params.id);
      if (!metodo) return res.status(404).json({ message: 'Método de pago no encontrado' });
      return res.json(metodo);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<Response> {
    try {
      const metodo = await this.servicio.actualizarMetodoPago(+req.params.id, req.body);
      return res.json(metodo);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async eliminar(req: Request, res: Response): Promise<Response> {
    try {
      const resultado = await this.servicio.eliminarMetodoPago(+req.params.id);
      if (!resultado) return res.status(404).json({ message: 'Método de pago no encontrado' });
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
