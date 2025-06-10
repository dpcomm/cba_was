import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class CarpoolMemberRepository {
    async findGroupsByUserId(userId: number):Promise<number[]> {
        const result = await prisma.carpoolMember.findMany({
        where: {
            userId: userId
        }, 
        select: {
            roomId: true,
        }
        });

        return result.map(e => e.roomId);
    }
    async findUserByCarpoolId(carpoolId: number):Promise<number[]> {
        const result = await prisma.carpoolMember.findMany({
        where: {
            roomId: carpoolId
        }, 
        select: {
            userId: true,
        }
        });

        return result.map(e => e.userId);
    }
}

export default CarpoolMemberRepository;