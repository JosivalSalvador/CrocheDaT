// Arquivo src/resources/product/product.router.ts
import { Router } from 'express';
import authController from './auth.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.post('/login', authController.login);
router.post('/logout', isAuth , authController.logout);
router.get('/session', authController.session)

export default router;