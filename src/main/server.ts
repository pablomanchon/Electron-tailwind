// src/server.ts
import express from 'express';
import { AppDataSource } from './database/data-source';
import productoRoutes from './routes/productoRoutes';
import cors from 'cors';
import movimientoRoutes from './routes/movimiento.routes';
import categoriaRoutes from './routes/categoria.routes';
import usuarioRoutes from './routes/user.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Inicializar la base de datos y arrancar el servidor
AppDataSource.initialize().then(() => {
  console.log('Base de datos SQLite inicializada.');

  app.use(productoRoutes); // Registrar rutas
  app.use('/api/moves', movimientoRoutes);
  app.use('/api/categories', categoriaRoutes);
  app.use('/api/users', usuarioRoutes)
  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });
}).catch((error) => console.error('Error al inicializar la base de datos', error));
