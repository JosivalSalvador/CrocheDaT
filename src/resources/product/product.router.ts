// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import productController from './product.controller';
import schema from './product.shema';
import validate from '../../middlewares/validate';
import isAuth from '../../middlewares/isAuth';

const router = Router();
// Product controller
router.get('/', productController.index);
router.post('/',  isAuth ,validate(schema), productController.create);
router.get('/:id', productController.read);
router.put('/:id', isAuth, validate(schema), productController.update);
router.delete('/:id', isAuth, productController.remove);

export default router;