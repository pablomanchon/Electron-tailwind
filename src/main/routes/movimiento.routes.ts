import { Router } from 'express';
import { MovimientoController } from '../controllers/movimiento.controller';

const router = Router();
const controller = new MovimientoController();

router.post('/', controller.crear.bind(controller));
router.get('/cc/:id/dia', controller.obtenerPorCcIdYDia.bind(controller));
router.get('/cc/:id/latest', controller.obtenerPorCcIdPaginado.bind(controller));
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.obtenerPorId.bind(controller));
router.put('/:id', controller.actualizar.bind(controller));
router.delete('/:id', controller.eliminar.bind(controller));

export default router;
