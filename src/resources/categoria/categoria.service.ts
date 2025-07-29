import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCategories(): Promise<Category[]> {
    return await prisma.category.findMany({
    });
}

export async function createCategory(data: { name: string }): Promise<Category> {
    return await prisma.category.create({ data });
}

export async function getCategoryById(id: string): Promise<Category | null> {
    return await prisma.category.findUnique({
        where: { id },
    });
}

export async function updateCategory(id: string, data: { name?: string }): Promise<Category | null> {
    return await prisma.category.update({
        where: { id },
        data,
    }).catch(() => null);
}

export async function deleteCategory(id: string): Promise<boolean> {
    try {
        await prisma.category.delete({
            where: { id },
        });
        return true;
    } catch {
        return false;
    }
}
