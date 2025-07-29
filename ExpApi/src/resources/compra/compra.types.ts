import { PurchaseItem } from "@prisma/client";


export type itemCompra = Pick<PurchaseItem, "quantity" | "productId">