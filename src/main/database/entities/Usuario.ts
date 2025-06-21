import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Movimiento } from "./Movimiento";
import { CuentaCorriente } from "./CuentaCorriente";

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

  @OneToOne(() => CuentaCorriente, (cc) => cc.usuario, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cuentaCorriente: CuentaCorriente;

  @Column({ nullable: true })
  email?: string;

}
