import { Request, Response } from "express";
import { checkAuth, createUserSingUp } from "./auth.service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { singUpDTO, loginDTO } from "./auth.types";
import createUserSingupError from "./auth.errors";



const signup = async (req: Request, res: Response) => {
    const newUser = req.body as singUpDTO;
    try {
        const user = await createUserSingUp(newUser);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        createUserSingupError(res, error);
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as loginDTO;

    try {
        if (req.session.uid) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: "Bad Request",
                message: "Usuário já está autenticado.",
            });
        } else {
            const usuario = await checkAuth({ email, password });

            if (!usuario) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Unauthorized",
                    message: "Email e/ou senha incorretos.",
                });
            } else {
                req.session.uid = usuario.id;
                req.session.userTypeId = usuario.userTypeId;

                res.status(StatusCodes.OK).json({
                    message: "Usuário autenticado com sucesso.",
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


export default { signup, login, logout };
