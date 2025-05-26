import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Producto } from './entities/Producto';
import { Movimiento } from './entities/Movimiento';
import { Categoria } from './entities/Categoria';
import { Usuario } from './entities/Usuario';
import { MovimientoMetodoPago } from './entities/MovimientoMetodoPago';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'app-data.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Movimiento,
    Usuario,
    Categoria,
    MovimientoMetodoPago
  ],
});
