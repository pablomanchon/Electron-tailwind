import { AppDataSource } from '../database/data-source';
import { Categoria } from '../database/entities/Categoria';
import { Repository } from 'typeorm';

export class CategoriaRepository {
  private repo: Repository<Categoria>;

  constructor() {
    this.repo = AppDataSource.getRepository(Categoria);
  }

  crear(data: Partial<Categoria>): Categoria {
    return this.repo.create(data);
  }

  guardar(categoria: Categoria): Promise<Categoria> {
    return this.repo.save(categoria);
  }

  obtenerTodas(): Promise<Categoria[]> {
    return this.repo.find();
  }

  obtenerPorId(id: number): Promise<Categoria | null> {
    return this.repo.findOne({ where: { id } });
  }

  obtenerPorIdOrFail(id: number): Promise<Categoria> {
    return this.repo.findOneOrFail({ where: { id } });
  }

  eliminar(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }
}
