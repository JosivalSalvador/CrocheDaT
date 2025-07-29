// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import compraController from './compra.controller';


const router = Router();

router.post('/:id', compraController.addCarrinho);
router.post('/', compraController.finalizarCompra);


export default router;