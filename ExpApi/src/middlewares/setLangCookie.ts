import { Request, Response, NextFunction } from 'express';
import { Languages } from '../resources/language/language.constants';

const setLangCookie = (req: Request, res: Response, next: NextFunction) => {
    if (!('lang' in req.cookies)) res.cookie('lang', process.env.DEFAUlT_LANGUAGE ?? Languages.ptBR);
    next();
};
export default setLangCookie