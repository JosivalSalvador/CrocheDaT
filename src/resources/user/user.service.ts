// Arquivo src/resources/user/user.service.ts
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO } from './user.types';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
}

export async function createUser(user: CreateUserDTO): Promise<User> {
    const round = parseInt(process.env.BCRYPT_SALT_ROUNDS!) ?? 10
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return await prisma.user.create({
        data: { ...user, password: hashedPassword },
    });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export async function getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { id },
    });
}

export async function updateUser(id: string, data: Partial<CreateUserDTO>): Promise<User | null> {
    return await prisma.user.update({
        where: { id },
        data,
    }).catch(() => null); // Retorna null se não encontrar
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        await prisma.user.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function changeUserPassword(id: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return false;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return false;

    const round = parseInt(process.env.BCRYPT_SALT_ROUNDS!) ?? 10
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });

    return true;
}
