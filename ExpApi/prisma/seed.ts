import { PrismaClient } from '@prisma/client';
import { UserTypes } from '../src/resources/user/user.types';

const prisma = new PrismaClient()


async function main() {
    return await prisma.userType.createMany({
        data: [
            { id: UserTypes.admin, label: "admin" },
            { id: UserTypes.client, label: "client" },
        ],
        skipDuplicates: true,
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});