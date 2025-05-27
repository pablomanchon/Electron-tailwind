import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();
const controller = new UsuarioController();

router.post('/', controller.crearUsuario.bind(controller));
router.get('/', controller.obtenerUsuarios.bind(controller));
router.get('/:id', controller.obtenerUsuarioPorId.bind(controller));
router.put('/:id', controller.actualizarUsuario.bind(controller));
router.delete('/:id', controller.eliminarUsuario.bind(controller));

export default router;
