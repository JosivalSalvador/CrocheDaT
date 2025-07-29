import { Product } from "@prisma/client";

export type CreateProductDTO = Pick<Product, "name" | "price" | "stockQuantity">;