import { Router } from 'express';
import languageController from './language.controller';
import validate from '../../middlewares/validate';
import { languageSchema } from './language.schema';

const router = Router();
router.patch('/' , validate(languageSchema) ,languageController.changeLanguage);

export default router;