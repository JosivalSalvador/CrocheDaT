import { UpdateProductDTO, CreateProductDTO, Product } from "./product.types";

export let products: Product[] = [];

export const getProducts = (): Product[] => {
  return products;
};

export const createProduct = (product: CreateProductDTO): Product => {
  console.log(product);
  const newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  return newProduct;
};

export const getProduct = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const updateProduct = (
  id: number,
  product: UpdateProductDTO
): Product => {
  const index = products.findIndex((p) => p.id === id);
  products[index] = { id, ...product };
  return products[index];
};

export const deleteProduct = (id: number): boolean => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products = products.filter((p) => p.id !== id);
  return true;
};
