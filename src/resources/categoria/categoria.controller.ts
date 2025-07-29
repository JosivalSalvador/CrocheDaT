import { Request, Response } from "express";
import {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "./categoria.service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createCategoryError from "./categoria.errors";

const index = async (_req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        res.status(StatusCodes.OK).json(categories);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const create = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "O campo 'name' é obrigatório." });
        return
    }

    try {
        const category = await createCategory({ name });
        res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
        createCategoryError(res, error);
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await getCategoryById(id);
        if (!category) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Categoria não encontrada." });
            return;
        }
        res.status(StatusCodes.OK).json(category);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updated = await updateCategory(id, { name });
        if (!updated) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Categoria não encontrada para atualização." });
            return;
        }
        res.status(StatusCodes.OK).json(updated);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await deleteCategory(id);
        if (!deleted) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Categoria não encontrada para exclusão." });
            return;
        }
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

export default { index, create, read, update, remove };
