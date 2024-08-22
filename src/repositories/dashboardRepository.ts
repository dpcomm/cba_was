import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DashboardRepository {
    async findAllGroupMembers() {
        const groupCounts = await prisma.user.groupBy({
            by: ['group'],
            _count: {userId: true,},
          });
        const result = groupCounts.map(groupCount => ({
            group: groupCount.group,
            count: groupCount._count.userId,
          }));
          return result;
    }

    async findAllRegistryMembers() {
        return await prisma.application.count();
    }

    async findAllPaidMembers() {
        return await prisma.application.count({
            where : {feePaid: true}
        });
    }

    async findAllAtendMembers() {
        return await prisma.application.count({
            where : {attended:true}
        });
    }
}

export default DashboardRepository;