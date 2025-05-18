import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movimiento } from "./Movimiento";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Movimiento, movimiento => movimiento.categoria)
  movimientos: Movimiento[];
}
