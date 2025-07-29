import { Router } from "express";
import productRouter from "../resources/product/product.router";
import compraRouter from "../resources/compra/compra.router"
import productRouterArry from "../resources/productArray/product.router"
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router"
import authRouter from '../resources/auth/auth.router';

const router = Router();

router.use("/products",
// #swagger.tags = ['Products']
productRouter);

router.use("/compra",
// #swagger.tags = ['Compra']
compraRouter);

router.use("/productsArray",
// #swagger.tags = ['Products Array']
productRouterArry);

router.use("/language",
// #swagger.tags = ['Language']
languageRouter);

router.use("/users", 
// #swagger.tags = ['Users']
userRouter)

router.use('/', 
// #swagger.tags = ['Auth']
authRouter);

export default router;
