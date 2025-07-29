// Arquivo src/resources/user/user.controller.ts
import { Request, Response } from "express";
import { ChangePasswordDTO, CreateUserDTO } from "./user.types";
import {createUser, getAllUsers, deleteUser, getUserById, updateUser, changeUserPassword} from "./user.service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createUserError from "./user.errors";

const index = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const create = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona um novo usuário na base.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateUserDto' }
    }
    #swagger.responses[201] = {
        schema: { $ref: '#/definitions/User' }
    }
    */
    const newUser = req.body as CreateUserDTO;
    try {
        const user = await createUser(newUser);
        res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        createUserError(res, error);
    }
};

const read = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um usuário específico.'
    #swagger.parameters['id'] = { description: 'ID do usuário' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/User' }
    }
    */
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado" });
        } else {
            res.status(StatusCodes.OK).json(user);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body as Partial<CreateUserDTO>;
    try {
        const updated = await updateUser(id, updatedData);
        if (!updated) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado para atualização" });
        } else {
            res.status(StatusCodes.OK).json(updated);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await deleteUser(id);
        if (!deleted) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Usuário não encontrado para exclusão" });
        } else {
            res.status(StatusCodes.NO_CONTENT).send();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const changePassword = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Altera a senha de um usuário.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/ChangePasswordDto' }
    }
    */
    const { id } = req.params;
    const { newPassword, oldPassword } = req.body as ChangePasswordDTO;
    try {
        const ok = await changeUserPassword(id, oldPassword, newPassword);
        if (ok) {
            res.status(StatusCodes.OK).json({ message: "Senha atualizada com sucesso" });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Senha antiga incorreta ou usuário não encontrado" });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

export default { index, create, read, update, remove, changePassword };
