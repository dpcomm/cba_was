import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class BackOfficeQuery {
    async UserAllQuery() {
    //     const query_options = {
    //     where: {
    //         OR: [
    //         {
    //             name: {
    //             contains: user_search,
    //             mode: 'insensitive', // 대소문자 구분 없음
    //             },
    //         },
    //         {
    //             group: {
    //             contains: user_search,
    //             mode: 'insensitive', // 대소문자 구분 없음
    //             },
    //         },
    //         ],
    //     },
    //     };
    // if (!user_search) {
    //     return await prisma.user.findMany();
    // }
    // return await prisma.user.findMany(query_options);
    return await prisma.user.findMany();
    }
}

export default BackOfficeQuery;