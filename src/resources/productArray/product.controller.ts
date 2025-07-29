import { Request, Response } from "express";

import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./product.service";
import { CreateProductDTO, UpdateProductDTO } from "./product.types";

const index = (req: Request, res: Response) => {
  const products = getProducts();
  res.status(200).json(products);
};

const create = (req: Request, res: Response) => {
  const product = req.body as CreateProductDTO;
  const newProduct = createProduct(product);
  res.status(201).json(newProduct);
};

const read = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = getProduct(id);
  res.status(200).json(product);
};

const update = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = req.body as UpdateProductDTO;
  const updatedProduct = updateProduct(id, product);
  res.status(200).json(updatedProduct);
};

const remove = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const result = deleteProduct(id);
  if (result == true) res.status(204).json();
  else res.status(400).json();
};

export default { index, create, read, update, remove };
