import { Repository } from 'typeorm';
import { Movimiento } from '../database/entities/Movimiento';
import { CuentaCorriente } from '../database/entities/CuentaCorriente';
import { CreateMovimientoDto, UpdateMovimientoDto } from '../dtos/movimiento.dto';
import { TipoMovimiento } from '../enums/MovimientoEnum';
import { esMetodoPagoValido, esTipoMovimientoValido } from '../utils/validaciontes';
import { MovimientoMetodoPago } from '../database/entities/MovimientoMetodoPago';

export class MovimientoService {
  constructor(
    private readonly repoMovimiento: Repository<Movimiento>,
    private readonly repoCuentaCorriente: Repository<CuentaCorriente>,
    private readonly repoMetodoPago: Repository<MovimientoMetodoPago>
  ) { }

  private ajustarSaldoCuenta(cuenta: CuentaCorriente, tipo: TipoMovimiento, monto: number, operacion: 'sumar' | 'restar') {
    const valor = tipo === TipoMovimiento.INGRESO ? monto : -monto;
    cuenta.saldo += operacion === 'sumar' ? valor : -valor;
  }

  async crearMovimiento(data: CreateMovimientoDto): Promise<Movimiento> {
    const cuentaCorriente = await this.repoCuentaCorriente.findOneOrFail({
      where: { id: data.cuentaCorrienteId },
      relations: ['usuario'],
    });

    if (!esTipoMovimientoValido(data.tipo)) {
      throw new Error("Tipo de movimiento inválido");
    }
    const movimiento = this.repoMovimiento.create({
      cuentaCorriente,
      fecha: new Date(),
      tipo: data.tipo,
      monto: data.monto,
      descripcion: data.descripcion,
      categoria: data.categoria,
      isDeleted: false,
    });

    await this.repoMovimiento.save(movimiento);

    const metodos = data.metodosPago.map((mp) => {
      if (!esMetodoPagoValido(mp.metodo)) {
        throw new Error(`Método de pago inválido: ${mp.metodo}`);
      }
      
      return this.repoMetodoPago.create({
        movimiento,
        metodo: mp.metodo,
        monto: mp.monto,
      });
    });

    movimiento.metodosPago = metodos;

    this.ajustarSaldoCuenta(cuentaCorriente, data.tipo, data.monto, 'sumar');
    await this.repoCuentaCorriente.save(cuentaCorriente);

    return movimiento;
  }

  async actualizarMovimiento(id: number, data: UpdateMovimientoDto): Promise<Movimiento> {
    const movimiento = await this.repoMovimiento.findOneOrFail({
      where: { id, isDeleted: false },
      relations: ['metodosPago', 'cuentaCorriente'],
    });

    const cuentaCorriente = movimiento.cuentaCorriente;

    // Revertir saldo anterior
    this.ajustarSaldoCuenta(cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto, 'restar');

    if (data.tipo && !esTipoMovimientoValido(data.tipo)) {
      throw new Error("Tipo de movimiento inválido");
    }

    movimiento.categoria = data.categoria ?? movimiento.categoria;
    movimiento.tipo = data.tipo ?? movimiento.tipo;
    movimiento.monto = data.monto ?? movimiento.monto;
    movimiento.fecha = data.fecha ? new Date(data.fecha) : new Date();;
    movimiento.descripcion = data.descripcion ?? movimiento.descripcion;

    if (data.metodosPago) {
      await this.repoMetodoPago.delete({ movimiento: { id: movimiento.id } });

      const nuevos = data.metodosPago.map((mp) => {
        if (!esMetodoPagoValido(mp.metodo)) {
          throw new Error(`Método de pago inválido: ${mp.metodo}`);
        }

        return this.repoMetodoPago.create({
          movimiento,
          metodo: mp.metodo,
          monto: mp.monto,
        });
      });

      await this.repoMetodoPago.save(nuevos);
      movimiento.metodosPago = nuevos;
    }

    // Aplicar nuevo saldo
    this.ajustarSaldoCuenta(cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto, 'sumar');
    await this.repoCuentaCorriente.save(cuentaCorriente);

    return this.repoMovimiento.save(movimiento);
  }

  async obtenerMovimientos(): Promise<Movimiento[]> {
    return this.repoMovimiento.find({
      where: { isDeleted: false },
      relations: ['cuentaCorriente', 'metodosPago'],
    });
  }

  async obtenerMovimientoPorId(id: number): Promise<Movimiento | null> {
    return this.repoMovimiento.findOne({
      where: { id, isDeleted: false },
      relations: ['cuentaCorriente', 'metodosPago'],
    });
  }

  async eliminarMovimiento(id: number): Promise<boolean> {
    const movimiento = await this.repoMovimiento.findOne({
      where: { id },
      relations: ['cuentaCorriente'],
    });
    if (!movimiento) return false;

    movimiento.isDeleted = true;

    // Revertir saldo
    this.ajustarSaldoCuenta(movimiento.cuentaCorriente, movimiento.tipo as TipoMovimiento, movimiento.monto, 'restar');
    await this.repoCuentaCorriente.save(movimiento.cuentaCorriente);

    await this.repoMovimiento.save(movimiento);
    return true;
  }
}
