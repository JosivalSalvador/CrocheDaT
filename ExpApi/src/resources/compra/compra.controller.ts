import { Request, Response } from "express";

import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { registraCompra } from "./compra.service";


const addCarrinho = async (req: Request, res: Response) => {
    const { id } = req.params
    const { quantity } = req.body

    if(!req.session.carrinhoCompra) req.session.carrinhoCompra = []

    req.session.carrinhoCompra.push({ productId: id, quantity: Number(quantity) })
    res.status(StatusCodes.CREATED).json({msg: "item adicionado ao carrinho de compra"})
};

const finalizarCompra = async (req: Request, res: Response) => {
    if(!req.session.carrinhoCompra){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Carrinho vazio"})
        return
    }
    if(!req.session.uid){
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Usuario não está logado"})
        return
    }
    try {
        await registraCompra(req.session.carrinhoCompra, req.session.uid)
        res.status(StatusCodes.CREATED).json({msg: "Compra finalizada"})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
};

export default { addCarrinho, finalizarCompra };
