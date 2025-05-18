import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movimiento } from "./Movimiento";

@Entity()
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Movimiento, movimiento => movimiento.metodoPago)
  movimientos: Movimiento[];
}
