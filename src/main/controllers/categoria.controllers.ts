import { Request, Response } from 'express';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { CategoriaService } from '../services/categoria.service';

export class CategoriaController {
  private servicio = new CategoriaService();

  async crear(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateCategoriaDto = req.body;
      const categoria = await this.servicio.crearCategoria(data);
      return res.status(201).json(categoria);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async listar(_req: Request, res: Response): Promise<Response> {
    try {
      const categorias = await this.servicio.obtenerCategorias();
      return res.json(categorias);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async obtenerPorId(req: Request, res: Response): Promise<Response> {
    try {
      const categoria = await this.servicio.obtenerCategoriaPorId(+req.params.id);
      if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
      return res.json(categoria);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async actualizar(req: Request, res: Response): Promise<Response> {
    try {
      const categoria = await this.servicio.actualizarCategoria(+req.params.id, req.body);
      return res.json(categoria);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async eliminar(req: Request, res: Response): Promise<Response> {
    try {
      const resultado = await this.servicio.eliminarCategoria(+req.params.id);
      if (!resultado) return res.status(404).json({ message: 'Categoría no encontrada' });
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
