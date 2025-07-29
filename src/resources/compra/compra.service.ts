import { PrismaClient, Purchase, PurchaseItem } from '@prisma/client';
import { itemCompra } from './compra.types';

const prisma = new PrismaClient()

export async function registraCompra(carrinho: itemCompra[], usuarioID: string){
    const compra = await prisma.purchase.create({
        data:{
            userId: usuarioID,
        },
    })
    await Promise.all(carrinho.map(produto =>
        prisma.purchaseItem.create({
            data: {
                purchaseId: compra.id,
                productId: produto.productId,
                quantity: Number(produto.quantity),
            },
        })
    ));

}

