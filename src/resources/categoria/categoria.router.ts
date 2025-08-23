// Arquivo src/resources/category/category.router.ts
import { Router } from 'express';
import categoryController from './categoria.controller';
import schema from './categoria.schema'
import validate from '../../middlewares/validate';
import isAuth from '../../middlewares/isAuth';

const router = Router();

// Category controller
router.get('/', categoryController.index);
router.post('/', isAuth ,validate(schema), categoryController.create);
router.get('/:id', categoryController.read);
router.put('/:id', isAuth,validate(schema), categoryController.update);
router.delete('/:id', isAuth,categoryController.remove);

export default router;
