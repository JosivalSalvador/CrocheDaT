import { PrismaClient, Product, Prisma } from '@prisma/client';
import { CreateProductDTO } from './product.types';

const prisma = new PrismaClient();

export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  });
}

export async function createProduct(product: CreateProductDTO): Promise<Product> {
    return await prisma.product.create({ data: {
        ...product,
        price: new Prisma.Decimal(product.price),
        photos: product.photos as Prisma.InputJsonValue,
    } });
}

export async function getProductById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
        where: { id },
    });
}

export async function updateProduct(id: string, data: Partial<CreateProductDTO>): Promise<Product | null> {
    return await prisma.product.update({
        where: { id },
        data: {
            ...data,
            price: data.price ? new Prisma.Decimal(data.price) : undefined,
            photos: data.photos as Prisma.InputJsonValue
        },
    }).catch(() => null); 
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
