import { requestSurveyResponseDto } from '@dtos/surveyDto';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class SurveyRepository {
    async CreateSurvey(surveyDTO: requestSurveyResponseDto) {
        return await prisma.application.create({
            data : {
                userId: surveyDTO.userId,
                idn: surveyDTO.idn,
                surveyData: JSON.parse(surveyDTO.surveyData),
                attended: !!surveyDTO.attended,
                feePaid: !!surveyDTO.feePaid,
                retreatId: surveyDTO.retreatId
            }
        })
    }
    async findResponse(userId: string) {
        return await prisma.application.findUnique({
            where: {
                userId: userId
            }
        });
    }
    async updateResponse(data: requestSurveyResponseDto) {
        return await prisma.application.update({
            where: {userId: data.userId},
            data: {
                userId: data.userId,
                idn: data.idn,
                surveyData: JSON.parse(data.surveyData),
                attended: !!data.attended,
                feePaid: !!data.feePaid,
                retreatId: data.retreatId
            },
        })
    }
}

export default SurveyRepository;