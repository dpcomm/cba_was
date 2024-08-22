import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DashboardRepository {
    async findAllGroupMembers() {
        const groupCounts = await prisma.user.groupBy({
            by: ['group'],
            _count: {
                userId: true,
            },
        });

        const allowedGroups = ['반일섭M', '노시은M', '권수영M', '대청2부'];
        const groupMap: { [key: string]: number } = {};

        groupCounts.forEach((groupCount) => {
            const groupName = allowedGroups.includes(groupCount.group) ? groupCount.group : '기타';

            if (groupMap[groupName]) {
                groupMap[groupName] += groupCount._count.userId;
            } else {
                groupMap[groupName] = groupCount._count.userId;
            }
        });

        const result = Object.keys(groupMap).map((group) => ({
            group,
            count: groupMap[group],
        }));

        return result;
    }

    async findAllRegistryMembers() {
        return await prisma.application.count();
    }

    async findAllPaidMembers() {
        return await prisma.application.count({
            where: { feePaid: true },
        });
    }

    async findAllAtendMembers() {
        return await prisma.application.count({
            where: { attended: true },
        });
    }
}

export default DashboardRepository;
