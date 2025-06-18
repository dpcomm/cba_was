import { requestRegistTokenDto } from '@dtos/fcmTokenDto';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class FcmTokenRepository {
    async registToken(tokenDTO: requestRegistTokenDto){
        return await prisma.fcmToken.create({
            data: {
                userId: tokenDTO.userId,
                token: tokenDTO.token,
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
    async findToken(token: string) {
        return await prisma.fcmToken.findUnique({
            where: {
                token: token,
            }
        });
    }
}

export default FcmTokenRepository;