import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class FcmRepository {
    async saveToken(userId: number, token: string){
        return await prisma.fcmToken.create({
            data: {
                userId: userId,
                token: token,
            }
        });
    }
    async deleteToken(token: string){
        return await prisma.fcmToken.delete({
            where: { token: token },
        });
    }
    async getTokens(userId: number): Promise<string[]>{
        const result = await prisma.fcmToken.findMany({
            where: {
                userId: userId,
            },
            select: {
                token: true,
            },
        });

        return result.map(e => e.token);
    }

}

export default FcmRepository;