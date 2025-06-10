// src/routes/cuenta-corriente.routes.ts
import { Router } from 'express';
import { CuentaCorrienteController } from '../controllers/cuentaCorriente.controller';

const router = Router();
const controller = new CuentaCorrienteController();

router.post('/', controller.crear.bind(controller));
router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.obtenerPorId.bind(controller));
router.put('/:id', controller.actualizar.bind(controller));
router.delete('/:id', controller.eliminar.bind(controller));

export default router;
