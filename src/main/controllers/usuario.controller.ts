import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';

export class UsuarioController {
  private usuarioService = new UsuarioService();

  async crearUsuario(req: Request, res: Response) {
    try {
      const data: CreateUsuarioDto = req.body;
      const usuario = await this.usuarioService.crearUsuario(data);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async obtenerUsuarios(_req: Request, res: Response) {
    try {
      const usuarios = await this.usuarioService.obtenerUsuarios();
      res.json(usuarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async obtenerUsuarioPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const usuario = await this.usuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async actualizarUsuario(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateUsuarioDto = req.body;
      const usuario = await this.usuarioService.actualizarUsuario(id, data);
      res.json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async eliminarUsuario(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const eliminado = await this.usuarioService.eliminarUsuario(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
