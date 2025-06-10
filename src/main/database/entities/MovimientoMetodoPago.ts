import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movimiento } from "./Movimiento";
import { Exclude } from "class-transformer";
// MovimientoMetodoPago.ts
@Entity()
export class MovimientoMetodoPago {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Movimiento, (mov) => mov.metodosPago)
    @Exclude()
    movimiento: Movimiento;

    @Column() // ← SQLite-friendly: string simple
    metodo: string;

    @Column("decimal", { precision: 12, scale: 2 })
    monto: number;
}
