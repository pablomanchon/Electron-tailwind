import express, { Request, Response } from 'express';
import { AppDataSource } from './database/data-source';
import { Producto } from './database/entities/Producto';
import { ProductoDTO } from './dtos/ProductoDTO';

const app = express();
const port = 3000;

app.use(express.json());

// Inicializar la base de datos y arrancar el servidor
AppDataSource.initialize().then(() => {
    console.log('Base de datos SQLite inicializada.');

    // GET todos los productos
    app.get('/api/productos', async (req, res) => {
        try {
            const productos = await AppDataSource.getRepository(Producto).find();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    });

    // POST un nuevo producto
    app.post('/api/productos', async (req: Request<{}, {}, ProductoDTO>, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Producto);
            const nuevoProducto = repo.create(req.body); // req.body tiene tipo ProductoDTO
            const resultado = await repo.save(nuevoProducto);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    });

   // PUT un producto existente
    app.put('/api/productos/:id', async (req, res) => {
        try {
            const repo = AppDataSource.getRepository(Producto);
            const producto = await repo.findOneBy({ id: parseInt(req.params.id) });
            if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

            repo.merge(producto, req.body);
            const resultado = await repo.save(producto);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    });

    // DELETE lógico de un producto
    app.delete('/api/productos/:id', async (req, res) => {
        try {
            const repo = AppDataSource.getRepository(Producto);
            const producto = await repo.findOneBy({ id: parseInt(req.params.id) });
            if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

            // Soft delete: Marca el producto como eliminado
            producto.isDeleted = true; // Si tienes el campo 'isDeleted'
            await repo.save(producto);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    });



    app.listen(port, () => {
        console.log(`Servidor backend escuchando en http://localhost:${port}`);
    });

}).catch((error) => console.error('Error al inicializar la base de datos', error));
