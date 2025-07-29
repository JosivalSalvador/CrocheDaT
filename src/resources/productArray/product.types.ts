export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export type CreateProductDTO = Pick<Product, "name" | "price" | "stock">;
export type UpdateProductDTO = Pick<Product, "name" | "price" | "stock">;
