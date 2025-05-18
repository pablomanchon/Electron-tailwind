import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetodoPago } from "./MetodoPago";
import { Categoria } from "./Categoria";

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: 'entrada' | 'salida';

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => MetodoPago, metodo => metodo.movimientos)
  metodoPago: MetodoPago;

  @ManyToOne(() => Categoria, categoria => categoria.movimientos, { nullable: true })
  categoria?: Categoria;
}
