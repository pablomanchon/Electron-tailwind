import { AppDataSource } from '../database/data-source';
import { Movimiento } from '../database/entities/Movimiento';
import { MetodoPago } from '../database/entities/MetodoPago';
import { Categoria } from '../database/entities/Categoria';
import { CreateMovimientoDto } from '../dtos/create-movimiento.dto.ts';
import { UpdateMovimientoDto } from '../dtos/update-movimiento.dto';

export class MovimientoService {
  private repoMovimiento = AppDataSource.getRepository(Movimiento);
  private repoMetodoPago = AppDataSource.getRepository(MetodoPago);
  private repoCategoria = AppDataSource.getRepository(Categoria);

  async crearMovimiento(data: CreateMovimientoDto): Promise<Movimiento> {
    const metodoPago = await this.repoMetodoPago.findOneOrFail({ where: { id: data.metodoPagoId } });

    let categoria: Categoria | undefined;
    if (data.categoriaId) {
      categoria = await this.repoCategoria.findOne({ where: { id: data.categoriaId } });
    }

    const movimiento = this.repoMovimiento.create({
      ...data,
      metodoPago,
      categoria,
      fecha: new Date(data.fecha),
    });

    return this.repoMovimiento.save(movimiento);
  }

  async actualizarMovimiento(id: number, data: UpdateMovimientoDto): Promise<Movimiento> {
    const movimiento = await this.repoMovimiento.findOneOrFail({ where: { id } });

    if (data.metodoPagoId) {
      movimiento.metodoPago = await this.repoMetodoPago.findOneOrFail({ where: { id: data.metodoPagoId } });
    }

    if (data.categoriaId !== undefined) {
      movimiento.categoria = data.categoriaId
        ? await this.repoCategoria.findOne({ where: { id: data.categoriaId } })
        : undefined;
    }

    Object.assign(movimiento, {
      ...data,
      fecha: data.fecha ? new Date(data.fecha) : movimiento.fecha,
    });

    return this.repoMovimiento.save(movimiento);
  }

  async obtenerMovimientos(): Promise<Movimiento[]> {
    return this.repoMovimiento.find({ relations: ['metodoPago', 'categoria'] });
  }

  async obtenerMovimientoPorId(id: number): Promise<Movimiento | null> {
    return this.repoMovimiento.findOne({
      where: { id },
      relations: ['metodoPago', 'categoria'],
    });
  }

  async eliminarMovimiento(id: number): Promise<boolean> {
    const resultado = await this.repoMovimiento.delete(id);
    return resultado.affected !== 0;
  }
}
