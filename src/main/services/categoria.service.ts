import { AppDataSource } from '../database/data-source';
import { Categoria } from '../database/entities/Categoria';
import { CreateCategoriaDto } from '../dtos/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/update-categoria.dto';

export class CategoriaService {
  private repo = AppDataSource.getRepository(Categoria);

  async crearCategoria(data: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.repo.create(data);
    return this.repo.save(categoria);
  }

  async obtenerCategorias(): Promise<Categoria[]> {
    return this.repo.find();
  }

  async obtenerCategoriaPorId(id: number): Promise<Categoria | null> {
    return this.repo.findOne({ where: { id } });
  }

  async actualizarCategoria(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.repo.findOneOrFail({ where: { id } });
    Object.assign(categoria, data);
    return this.repo.save(categoria);
  }

  async eliminarCategoria(id: number): Promise<boolean> {
    const resultado = await this.repo.delete(id);
    return resultado.affected !== 0;
  }
}
