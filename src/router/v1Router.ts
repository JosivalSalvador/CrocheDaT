import { Router } from "express";
import productRouter from "../resources/product/product.router";
import categoryRouter from '../resources/categoria/categoria.router';
import authRouter from '../resources/auth/auth.router'



const router = Router();

router.use("/products",
// #swagger.tags = ['Products']
productRouter);

router.use("/categorias",
// #swagger.tags = ['Categorias']
categoryRouter
);

router.use('/', 
// #swagger.tags = ['Auth']
authRouter);

export default router;
