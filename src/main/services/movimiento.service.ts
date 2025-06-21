import { Repository, DataSource, Between } from 'typeorm';
import { Movimiento } from '../database/entities/Movimiento';
import { CuentaCorriente } from '../database/entities/CuentaCorriente';
import { MovimientoMetodoPago } from '../database/entities/MovimientoMetodoPago';
import { CreateMovimientoDto, mapMovimientoToDto, MovimientoDto, UpdateMovimientoDto } from '../dtos/movimiento.dto';
import { TipoMovimiento } from '../enums/MovimientoEnum';
import { esMetodoPagoValido, esTipoMovimientoValido } from '../utils/validaciontes';

export class MovimientoService {
  constructor(
    private readonly repoMovimiento: Repository<Movimiento>,
    private readonly dataSource: DataSource
  ) { }

  private ajustarSaldoCuenta(
    cuenta: CuentaCorriente,
    tipo: TipoMovimiento,
    monto: number,
  ) {
    const valor = tipo === TipoMovimiento.INGRESO ? monto : -monto;
    cuenta.saldo += valor;
  }

  async crearMovimiento(data: CreateMovimientoDto): Promise<MovimientoDto> {
    return await this.dataSource.transaction(async (manager) => {
      const repoMovimiento = manager.getRepository(Movimiento);
      const repoCuentaCorriente = manager.getRepository(CuentaCorriente);
      const repoMetodoPago = manager.getRepository(MovimientoMetodoPago);

      const cuentaCorriente = await repoCuentaCorriente.findOneOrFail({
        where: { id: data.cuentaCorrienteId },
        relations: ['usuario'],
      });

      if (!esTipoMovimientoValido(data.tipo)) {
        throw new Error("Tipo de movimiento inválido");
      }

      const totalPago = data.metodosPago.reduce((acc, mp) => acc + mp.monto, 0);
      if (totalPago != data.monto) {
        throw new Error("La suma de los métodos de pago no coincide con el monto del movimiento");
      }

      const movimiento = repoMovimiento.create({
        cuentaCorriente,
        fecha: new Date(),
        tipo: data.tipo,
        monto: data.monto,
        descripcion: data.descripcion,
        categoria: data.categoria,
        isDeleted: false,
      });

      const savedMovimiento = await repoMovimiento.save(movimiento);

      const metodos = data.metodosPago.map((mp) => {
        if (!esMetodoPagoValido(mp.metodo)) {
          throw new Error(`Método de pago inválido: ${mp.metodo}`);
        }

        return repoMetodoPago.create({
          movimiento: savedMovimiento,
          metodo: mp.metodo,
          monto: mp.monto,
        });
      });

      await repoMetodoPago.save(metodos);
      savedMovimiento.metodosPago = metodos;
      this.ajustarSaldoCuenta(cuentaCorriente, data.tipo, data.monto);
      await repoCuentaCorriente.save(cuentaCorriente);

      return mapMovimientoToDto(savedMovimiento);
    });
  }

  async obtenerMovimientos(): Promise<MovimientoDto[]> {
    const movimientos = await this.repoMovimiento.find({
      where: { isDeleted: false },
      relations: ['cuentaCorriente', 'metodosPago'],
      order: { fecha: 'DESC' },
    });

    return movimientos.map(mapMovimientoToDto);
  }

  async obtenerPorFecha(inicio, fin): Promise<MovimientoDto[]> {
    const movimientos = await this.repoMovimiento.find({
      where: { fecha: Between(inicio, fin) }
    })

    return movimientos.map(mapMovimientoToDto);
  }

  async obtenerPorDia(dia: Date): Promise<MovimientoDto[]> {
    const desde = new Date(dia);
    desde.setHours(0, 0, 0, 0)

    const hasta = new Date(dia);
    hasta.setHours(23, 59, 59, 999);

    const movimientos = await this.repoMovimiento.find({
      where: {
        isDeleted: false,
        fecha: Between(desde, hasta),
      },
      relations: ['cuentaCorriente', 'metodosPago'],
      order: { fecha: 'DESC' },
    });

    return movimientos.map(mapMovimientoToDto);
  }

  async obtenerMovimientoPorId(id: number): Promise<MovimientoDto | null> {
    const movimiento = await this.repoMovimiento.findOne({
      where: { id, isDeleted: false },
      relations: ['cuentaCorriente', 'metodosPago'],
    });

    return movimiento ? mapMovimientoToDto(movimiento) : null;
  }

  async actualizarMovimiento(id: number, data: UpdateMovimientoDto): Promise<MovimientoDto> {
    return await this.dataSource.transaction(async (manager) => {
      const repoMovimiento = manager.getRepository(Movimiento);
      const repoCuentaCorriente = manager.getRepository(CuentaCorriente);
      const repoMetodoPago = manager.getRepository(MovimientoMetodoPago);

      const movimiento = await repoMovimiento.findOneOrFail({
        where: { id, isDeleted: false },
        relations: ['cuentaCorriente', 'metodosPago'],
      });

      const cuentaCorriente = movimiento.cuentaCorriente;

      this.ajustarSaldoCuenta(cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto);

      if (!esTipoMovimientoValido(data.tipo)) {
        throw new Error("Tipo de movimiento inválido");
      }

      const totalPago = data.metodosPago.reduce((acc, mp) => acc + mp.monto, 0);
      if (totalPago !== data.monto) {
        throw new Error("La suma de los métodos de pago no coincide con el monto");
      }

      movimiento.tipo = data.tipo;
      movimiento.monto = data.monto;
      movimiento.descripcion = data.descripcion;
      movimiento.categoria = data.categoria;

      await repoMetodoPago.delete({ movimiento: { id: movimiento.id } });

      const nuevosMetodos = data.metodosPago.map((mp) =>
        repoMetodoPago.create({
          movimiento,
          metodo: mp.metodo,
          monto: mp.monto,
        })
      );

      await repoMetodoPago.save(nuevosMetodos);
      movimiento.metodosPago = nuevosMetodos;

      this.ajustarSaldoCuenta(cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto);
      await repoCuentaCorriente.save(cuentaCorriente);

      const saved = await repoMovimiento.save(movimiento);
      return mapMovimientoToDto(saved);
    });
  }

  async eliminarMovimiento(id: number): Promise<boolean> {
    return await this.dataSource.transaction(async (manager) => {
      const repoMovimiento = manager.getRepository(Movimiento);
      const repoCuentaCorriente = manager.getRepository(CuentaCorriente);
      const repoMetodoPago = manager.getRepository(MovimientoMetodoPago);

      const movimiento = await repoMovimiento.findOne({
        where: { id, isDeleted: false },
        relations: ['cuentaCorriente', 'metodosPago'],
      });

      if (!movimiento) return false;

      const cuentaCorriente = movimiento.cuentaCorriente;

      // Revertir el efecto en el saldo
      this.ajustarSaldoCuenta(cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto);
      await repoCuentaCorriente.save(cuentaCorriente);

      // Eliminar lógicamente el movimiento
      movimiento.isDeleted = true;
      await repoMovimiento.save(movimiento);

      // Borrar métodos de pago asociados
      await repoMetodoPago.delete({ movimiento: { id: movimiento.id } });

      return true;
    });
  }

async obtenerPorCcIdYDia(ccId: number, fecha: Date, skip = 0, take = 10) {
  const inicioDia = new Date(fecha);
  inicioDia.setHours(0, 0, 0, 0);

  const finDia = new Date(fecha);
  finDia.setHours(23, 59, 59, 999);

  const movimientos = await this.repoMovimiento.find({
    where: {
      cuentaCorriente: { id: ccId },
      fecha: Between(inicioDia, finDia),
      isDeleted: false,
    },
    relations: ['cuentaCorriente', 'cuentaCorriente.usuario', 'metodosPago'],
    order: { fecha: 'DESC' },
    skip,
    take,
  });
  console.log(movimientos)

  return movimientos.map(mapMovimientoToDto);
}


async obtenerPorCcIdPaginado(ccId: number, skip = 0, take = 10): Promise<MovimientoDto[]> {
  const movimientos = await this.repoMovimiento.find({
    where: {
      isDeleted: false,
      cuentaCorriente: { id: ccId },
    },
    relations: ['cuentaCorriente', 'cuentaCorriente.usuario', 'metodosPago'],
    order: { fecha: 'DESC' },
    skip,
    take,
  });

  return movimientos.map(mapMovimientoToDto);
}



}
