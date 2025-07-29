// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import userController from './user.controller';
import schema from './user.shema';
import validate from '../../middlewares/validate';

const router = Router();
// Product controller
router.get('/', userController.index);
router.post('/', validate(schema),userController.create);
router.get('/:id', userController.read);
router.put('/:id', validate(schema),userController.update);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.changePassword);

export default router;