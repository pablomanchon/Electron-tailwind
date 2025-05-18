import { Router } from 'express';
import { MetodoPagoController } from '../controllers/metodoPago.controller';

const router = Router();
const controller = new MetodoPagoController();

router.post('/', controller.crear.bind(controller));
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.obtenerPorId.bind(controller));
router.put('/:id', controller.actualizar.bind(controller));
router.delete('/:id', controller.eliminar.bind(controller));

export default router;
