// src/server.ts
import express from 'express';
import { AppDataSource } from './database/data-source';
import productoRoutes from './routes/productoRoutes';
import cors from 'cors';
import movimientoRoutes from './routes/movimiento.routes';
import metodoPagoRoutes from './routes/metodoPago.routes';
import categoriaRoutes from './routes/categoria.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Inicializar la base de datos y arrancar el servidor
AppDataSource.initialize().then(() => {
  console.log('Base de datos SQLite inicializada.');

  app.use(productoRoutes); // Registrar rutas
  app.use('/api/movimientos', movimientoRoutes);
  app.use('/api/metodosPago', metodoPagoRoutes);
  app.use('/api/categorias', categoriaRoutes);
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });
}).catch((error) => console.error('Error al inicializar la base de datos', error));
