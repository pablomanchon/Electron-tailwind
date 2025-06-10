import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import { Movimiento } from "./Movimiento"
import { Usuario } from "./Usuario"

@Entity()
export class CuentaCorriente {
  @PrimaryGeneratedColumn()
  id: number

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  saldo: number

  @OneToMany(() => Movimiento, (movimiento) => movimiento.cuentaCorriente)
  movimientos: Movimiento[]

  @OneToOne(() => Usuario, (usuario) => usuario.cuentaCorriente)
  usuario: Usuario

  @Column({ default: false })
  isDeleted: boolean
}
