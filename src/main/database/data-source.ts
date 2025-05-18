import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Producto } from './entities/Producto';
import { Movimiento } from './entities/Movimiento';
import { MetodoPago } from './entities/MetodoPago';
import { Categoria } from './entities/Categoria';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'app-data.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Movimiento,
    MetodoPago,
    Categoria,
  ],
});
