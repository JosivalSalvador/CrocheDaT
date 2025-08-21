import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        next();
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Unauthorized",
            message: "O usuário não é ADMIN.",
        });
    }
}

export default isAuth;
