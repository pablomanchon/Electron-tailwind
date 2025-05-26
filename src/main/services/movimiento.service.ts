import { AppDataSource } from '../database/data-source';
import { Movimiento } from '../database/entities/Movimiento';
import { MovimientoMetodoPago } from '../database/entities/MovimientoMetodoPago';
import { Categoria } from '../database/entities/Categoria';
import { Usuario } from '../database/entities/Usuario';
import { TipoMovimiento } from '../enums/MovimientoEnum';
import { CreateMovimientoDto, UpdateMovimientoDto } from '../dtos/movimiento.dto';
import { MetodoPago } from '../enums/MetodoPagoEnum';

export class MovimientoService {
  private repoMovimiento = AppDataSource.getRepository(Movimiento);
  private repoMetodoPago = AppDataSource.getRepository(MovimientoMetodoPago);
  private repoCategoria = AppDataSource.getRepository(Categoria);
  private repoUsuario = AppDataSource.getRepository(Usuario);

  async crearMovimiento(data: CreateMovimientoDto): Promise<Movimiento> {
    const usuario = await this.repoUsuario.findOneOrFail({ where: { id: data.usuarioId } });

    if (!Object.values(TipoMovimiento).includes(data.tipo as TipoMovimiento)) {
      throw new Error("Tipo de movimiento inválido");
    }

    const movimiento = new Movimiento();
    movimiento.usuario = usuario;
    movimiento.fecha = new Date(data.fecha);
    movimiento.tipo = data.tipo;
    movimiento.monto = data.monto;
    movimiento.descripcion = data.descripcion;
    movimiento.isDeleted = false;

    if (data.categoriaId) {
      const categoria = await this.repoCategoria.findOne({ where: { id: data.categoriaId } });
      movimiento.categoria = categoria;
    }

    // Creamos movimiento primero para tener el ID
    await this.repoMovimiento.save(movimiento);

    // Validar y asignar métodos de pago
    const metodos: MovimientoMetodoPago[] = [];

    for (const mp of data.metodosPago) {
      if (!Object.values(MetodoPago).includes(mp.metodo as MetodoPago)) {
        throw new Error(`Método de pago inválido: ${mp.metodo}`);
      }

      const mmp = new MovimientoMetodoPago();
      mmp.movimiento = movimiento;
      mmp.metodo = mp.metodo;
      mmp.monto = mp.monto;
      metodos.push(mmp);
    }

    await this.repoMetodoPago.save(metodos);
    movimiento.metodosPago = metodos;

    return movimiento;
  }

  async actualizarMovimiento(id: number, data: UpdateMovimientoDto): Promise<Movimiento> {
    const movimiento = await this.repoMovimiento.findOneOrFail({
      where: { id, isDeleted: false },
      relations: ['metodosPago'],
    });

    if (data.usuarioId) {
      movimiento.usuario = await this.repoUsuario.findOneOrFail({ where: { id: data.usuarioId } });
    }

    if (data.tipo && !Object.values(TipoMovimiento).includes(data.tipo as TipoMovimiento)) {
      throw new Error("Tipo de movimiento inválido");
    }

    if (data.categoriaId) {
      movimiento.categoria = await this.repoCategoria.findOne({ where: { id: data.categoriaId } });
    }

    movimiento.tipo = data.tipo ?? movimiento.tipo;
    movimiento.monto = data.monto ?? movimiento.monto;
    movimiento.fecha = data.fecha ? new Date(data.fecha) : movimiento.fecha;
    movimiento.descripcion = data.descripcion ?? movimiento.descripcion;

    // Si quiere actualizar métodos de pago
    if (data.metodosPago) {
      // Borramos los anteriores
      await this.repoMetodoPago.delete({ movimiento: { id: movimiento.id } });

      const nuevos = data.metodosPago.map((mp) => {
        if (!Object.values(MetodoPago).includes(mp.metodo as MetodoPago)) {
          throw new Error(`Método de pago inválido: ${mp.metodo}`);
        }
        const mmp = new MovimientoMetodoPago();
        mmp.movimiento = movimiento;
        mmp.metodo = mp.metodo;
        mmp.monto = mp.monto;
        return mmp;
      });

      await this.repoMetodoPago.save(nuevos);
      movimiento.metodosPago = nuevos;
    }

    return this.repoMovimiento.save(movimiento);
  }

  async obtenerMovimientos(): Promise<Movimiento[]> {
    return this.repoMovimiento.find({
      where: { isDeleted: false },
      relations: ['usuario', 'metodosPago', 'categoria'],
    });
  }

  async obtenerMovimientoPorId(id: number): Promise<Movimiento | null> {
    return this.repoMovimiento.findOne({
      where: { id, isDeleted: false },
      relations: ['usuario', 'metodosPago', 'categoria'],
    });
  }

  async eliminarMovimiento(id: number): Promise<boolean> {
    const movimiento = await this.repoMovimiento.findOne({ where: { id } });
    if (!movimiento) return false;

    movimiento.isDeleted = true;
    await this.repoMovimiento.save(movimiento);
    return true;
  }
}
