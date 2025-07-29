// Arquivo src/resources/category/category.router.ts
import { Router } from 'express';
import categoryController from './categoria.controller';
import schema from './categoria.schema'
import validate from '../../middlewares/validate';

const router = Router();

// Category controller
router.get('/', categoryController.index);
router.post('/', validate(schema), categoryController.create);
router.get('/:id', categoryController.read);
router.put('/:id', validate(schema), categoryController.update);
router.delete('/:id', categoryController.remove);

export default router;
