import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcryptjs';


const login = async (req: Request, res: Response) => {
     const { user, password } = req.body;

    try {
        if (req.session.user) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Bad Request",
                message: "Usuário já está autenticado.",
            });
        } else {
            const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD ?? "")
            if (user === process.env.ADMIN_USER && match) {
                req.session.user = user;

                res.status(StatusCodes.OK).json({
                    message: "Usuário autenticado com sucesso.",
                });
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Unauthorized",
                    message: "Email e/ou senha incorretos.",
            });
}

        }
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "Não foi possível processar o login. Tente novamente mais tarde.",
        });
    }
};

const logout = async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    message: "Erro ao encerrar a sessão.",
                });
            } else {
                res.clearCookie("connect.sid");
                res.status(StatusCodes.OK).json({
                    message: "Logout realizado com sucesso.",
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            message: "Erro inesperado ao tentar realizar logout.",
        });
    }
};

const session = async (req: Request, res: Response) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    }else{
        res.json({ authenticated: false });
    }
}
export default { login, logout, session };
