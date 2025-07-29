import { Product } from "@prisma/client";

export type CreateProductDTO = Pick<Product, "name" | "price" | "categoryId" | "description" | "material" |"photos" | "productionTime" >;