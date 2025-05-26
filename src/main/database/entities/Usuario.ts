import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Movimiento } from "./Movimiento";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  tipo: string; // Opcional, ej: 'Persona' o 'Empresa'

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
  movimientos: Movimiento[];
}
