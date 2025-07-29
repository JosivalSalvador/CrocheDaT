import { PrismaClient,User } from '@prisma/client';
import bcrypt from 'bcryptjs'
import { loginDTO, singUpDTO } from './auth.types';
import { UserTypes } from '../user/user.types';

const prisma = new PrismaClient();

export async function createUserSingUp(user: singUpDTO): Promise<User> {
    const round = parseInt(process.env.BCRYPT_SALT_ROUNDS!) ?? 10
    const salt = await bcrypt.genSalt(round);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return await prisma.user.create({
        data: { ...user, password: hashedPassword, userTypeId: UserTypes.client },
    });
}

export const checkAuth = async (credenciais: loginDTO,): Promise<User | null> => {

    const usuario = await prisma.user.findFirst({ where: { email: credenciais.email } });

    if (!usuario) return null;
    
    const ok = await bcrypt.compare(credenciais.password, usuario.password);

    if (!ok) return null

    return usuario;
}

export const checkIsAdmin = async (sessionID: string): Promise<boolean> => {
    const usuario = await prisma.user.findUnique({
        where: { id: sessionID },
    })

    if(!usuario) return false

    if(usuario.userTypeId === UserTypes.admin){
        return true
    }

    return false  
};