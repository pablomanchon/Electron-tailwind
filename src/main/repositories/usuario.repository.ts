import { AppDataSource } from "../database/data-source";
import { Usuario } from "../database/entities/Usuario";
import { Repository } from "typeorm";

export class UsuarioRepository {
  private repo: Repository<Usuario>;

  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  save(usuario: Usuario) {
    return this.repo.save(usuario);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
