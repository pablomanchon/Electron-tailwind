import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { MovimientoMetodoPago } from "./MovimientoMetodoPago";
import { Categoria } from "./Categoria";

@Entity()
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.movimientos)
  usuario: Usuario;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  tipo: string;

  @Column("decimal", { precision: 12, scale: 2 })
  monto: number;

  @OneToMany(() => MovimientoMetodoPago, (mmp) => mmp.movimiento, {
    cascade: true,
    eager: true,
  })
  metodosPago: MovimientoMetodoPago[];

  @Column({ nullable: true })
  descripcion?: string;

  @ManyToOne(() => Categoria, { nullable: true })
  categoria?: Categoria;

  @Column({ default: false })
  isDeleted: boolean;
}
