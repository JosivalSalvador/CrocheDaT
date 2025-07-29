import { Router } from "express";
import productRouter from "../resources/product/product.router";
import categoryRouter from '../resources/categoria/categoria.router';



const router = Router();

router.use("/products",
// #swagger.tags = ['Products']
productRouter);

router.use("/categorias",
    // #swagger.tags = ['Categorias']
    categoryRouter
);

export default router;
