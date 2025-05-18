import { AppDataSource } from '../database/data-source';
import { MetodoPago } from '../database/entities/MetodoPago';
import { CreateMetodoPagoDto } from '../dtos/create-metodo-pago.dto';
import { UpdateMetodoPagoDto } from '../dtos/update-metodo-pago.dto';

export class MetodoPagoService {
  private repo = AppDataSource.getRepository(MetodoPago);

  async crearMetodoPago(data: CreateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = this.repo.create(data);
    return this.repo.save(metodoPago);
  }

  async obtenerMetodosPago(): Promise<MetodoPago[]> {
    return this.repo.find();
  }

  async obtenerMetodoPagoPorId(id: number): Promise<MetodoPago | null> {
    return this.repo.findOne({ where: { id } });
  }

  async actualizarMetodoPago(id: number, data: UpdateMetodoPagoDto): Promise<MetodoPago> {
    const metodoPago = await this.repo.findOneOrFail({ where: { id } });
    Object.assign(metodoPago, data);
    return this.repo.save(metodoPago);
  }

  async eliminarMetodoPago(id: number): Promise<boolean> {
    const resultado = await this.repo.delete(id);
    return resultado.affected !== 0;
  }
}
