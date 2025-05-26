// entities/MovimientoMetodoPago.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Movimiento } from "./Movimiento";
import { MetodoPago } from "../../enums/MetodoPagoEnum";

@Entity()
export class MovimientoMetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movimiento, (movimiento) => movimiento.metodosPago, { onDelete: "CASCADE" })
  movimiento: Movimiento;

  @Column({ type: "text" }) // <-- SQLite-friendly
  metodo: MetodoPago;

  @Column("decimal", { precision: 12, scale: 2 })
  monto: number;
}
