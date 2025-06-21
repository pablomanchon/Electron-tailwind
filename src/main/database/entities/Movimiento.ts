import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CuentaCorriente } from "./CuentaCorriente";
import { MovimientoMetodoPago } from "./MovimientoMetodoPago";

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  tipo: string;

  @Column("decimal", { precision: 12, scale: 2 })
  monto: number;

  @OneToMany(() => MovimientoMetodoPago, (mp) => mp.movimiento, { cascade: true, eager: true })
  metodosPago: MovimientoMetodoPago[];

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ nullable: true })
  categoria?: string;

  @ManyToOne(() => CuentaCorriente, (cuenta) => cuenta.movimientos)
  cuentaCorriente: CuentaCorriente;

  @Column({ default: false })
  isDeleted: boolean;
}
