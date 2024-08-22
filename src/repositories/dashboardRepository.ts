import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GroupCount {
    group: string;
    count: number;
}

class DashboardRepository {
    async findAllGroupMembers() {
        const groupCounts = await prisma.user.groupBy({
            by: ['group'],
            _count: {
                userId: true,
            },
        });

        const allowedGroups = ['반일섭M', '노시은M', '권수영M', '대청2부'];

        const result = groupCounts.map((groupCount: { group: string; _count: { userId: number } }): GroupCount => {
            const groupName = allowedGroups.includes(groupCount.group) ? groupCount.group : '기타';
            return {
                group: groupName,
                count: groupCount._count.userId,
            };
        });

        const groupedResult = result.reduce((acc: GroupCount[], curr: GroupCount): GroupCount[] => {
            const existingGroup = acc.find((group: GroupCount) => group.group === curr.group);
            if (existingGroup) {
                existingGroup.count += curr.count;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);

        return groupedResult;
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
