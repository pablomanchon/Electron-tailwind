import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';
import { Categoria } from '../database/entities/Categoria';
import { CategoriaRepository } from '../repositories/categoria.repository';

export class CategoriaService {
  private repo = new CategoriaRepository();

  async crearCategoria(data: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.repo.crear(data);
    return this.repo.guardar(categoria);
  }

  async obtenerCategorias(): Promise<Categoria[]> {
    return this.repo.obtenerTodas();
  }

  async obtenerCategoriaPorId(id: number): Promise<Categoria | null> {
    return this.repo.obtenerPorId(id);
  }

  async actualizarCategoria(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.repo.obtenerPorIdOrFail(id);
    Object.assign(categoria, data);
    return this.repo.guardar(categoria);
  }

  async eliminarCategoria(id: number): Promise<boolean> {
    const resultado = await this.repo.eliminar(id);
    return resultado.affected !== 0;
  }
}
