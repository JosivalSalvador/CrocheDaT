import { Category } from "@prisma/client";

export type CreateProductDTO = Pick<Category, "name" >;