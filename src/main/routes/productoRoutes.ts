import { Router } from "express";
import { ProductoController } from "../controllers/ProductoController";

const router = Router();

router.get('/api/productos', ProductoController.obtenerProductos);
router.get('/api/productos/:id', ProductoController.obtenerProductoPorId);
router.post('/api/productos', ProductoController.crearProducto);
router.put('/api/productos/:id', ProductoController.actualizarProducto);
router.delete('/api/productos/:id', ProductoController.eliminarProducto);

export default router;
