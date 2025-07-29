import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDTO } from './product.types';

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
}

export async function createProduct(product: CreateProductDTO): Promise<Product> {
    return await prisma.product.create({ data: product });
}

export async function getProductById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
        where: { id },
    });
}

export async function updateProduct(id: string, data: Partial<CreateProductDTO>): Promise<Product | null> {
    return await prisma.product.update({
        where: { id },
        data,
    }).catch(() => null); // Retorna null se não encontrar
}

export async function deleteProduct(id: string): Promise<boolean> {
    try {
        await prisma.product.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        return false;
    }
}
