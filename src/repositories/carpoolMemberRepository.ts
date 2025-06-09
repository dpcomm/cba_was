import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class CarpoolMemberRepository {
    async findGroupsByUserId(userId: number) {
        return await prisma.carpoolMember.findMany({
        where: {
            userId: userId
        }
        });
    }
}

export default CarpoolMemberRepository;