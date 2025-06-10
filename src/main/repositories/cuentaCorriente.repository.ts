// src/repositories/cuenta-corriente.repository.ts
import { AppDataSource } from '../database/data-source';
import { Repository } from 'typeorm';
import { CuentaCorriente } from '../database/entities/CuentaCorriente';

export class CuentaCorrienteRepository {
  private repo: Repository<CuentaCorriente>;

  constructor() {
    this.repo = AppDataSource.getRepository(CuentaCorriente);
  }

  findAll() {
    return this.repo.find({ where: { isDeleted: false }, relations: ['usuario'] });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id, isDeleted: false }, relations: ['usuario'] });
  }

  save(cuenta: CuentaCorriente) {
    return this.repo.save(cuenta);
  }

  async softDelete(id: number): Promise<boolean> {
    const cuenta = await this.repo.findOneBy({ id });
    if (!cuenta) return false;
    cuenta.isDeleted = true;
    await this.repo.save(cuenta);
    return true;
  }
}
