import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Producto } from './entities/Producto';
import { Movimiento } from './entities/Movimiento';
import { Usuario } from './entities/Usuario';
import { CuentaCorriente } from './entities/CuentaCorriente';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'app-data.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Movimiento,
    Usuario,
    CuentaCorriente
  ],
});
