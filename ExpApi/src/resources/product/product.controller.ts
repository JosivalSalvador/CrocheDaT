import { Request, Response } from "express";
import { CreateProductDTO } from "./product.types";
import { createProduct, getAllProducts, deleteProduct, getProductById, updateProduct } from "./product.service";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createProductError from "./product.errors";




const index = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    try {
        res.status(StatusCodes.OK).json(products)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
};

const create = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona um novo produto na base.'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateProductDto' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Product' }
    }
    */
    const newProduct = req.body as CreateProductDTO;
    try {
        const product = await createProduct(newProduct)
        res.status(StatusCodes.CREATED).json(product)
        
    } catch (error) {
        createProductError(res, error);
    }

};

const read = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um produto específico.'
    #swagger.parameters['id'] = { description: 'ID do produto' }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Product' }
    }
    */
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Produto não encontrado" });
        }else{
            res.status(StatusCodes.OK).json(product);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body as Partial<CreateProductDTO>;
    try {
        const updated = await updateProduct(id, updatedData);
        if (!updated) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Produto não encontrado para atualização" });
        }else{
            res.status(StatusCodes.OK).json(updated);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await deleteProduct(id);
        if (!deleted) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Produto não encontrado para exclusão" });
        }else{
            res.status(StatusCodes.NO_CONTENT).send();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};


export default { index, create, read, update, remove };
