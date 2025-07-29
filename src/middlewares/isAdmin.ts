import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { checkIsAdmin } from '../resources/auth/auth.service';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.session.uid;

    if (uid && (await checkIsAdmin(uid))) {
        next();
    } else {
        res.status(StatusCodes.FORBIDDEN).json({
            error: "Forbidden",
            message: "Acesso negado. Apenas administradores têm permissão.",
        });
    }
};

export default isAdmin;
