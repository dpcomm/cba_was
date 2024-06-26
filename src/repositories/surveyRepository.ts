import { requestSurveyResponseDto } from '@dtos/surveyDto';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class SurveyRepository {
    async CreateSurvey(surveyDTO: requestSurveyResponseDto) {
        const busMapping: {[key: number]: number[]} = {0:[0,0],1:[1,0],2:[1,1]};
        const busValue = surveyDTO.bus ?? 0;
        const surveyData = {
            'meal':surveyDTO.meal,
        'transfer':{
            'own-car':surveyDTO.carId,
            'bus':busMapping[busValue]}
        }
        return await prisma.application.create({
            data : {
                userId: surveyDTO.userId,
                idn: surveyDTO.idn,
                surveyData: JSON.parse(JSON.stringify(surveyData)),
                attended: true,
                feePaid: false,
                retreatId: 1
            }
        });
    }
    async findResponse(userId: string) {
        return await prisma.application.findUnique({
            where: {
                userId: userId
            }
        });
    }
    async updateResponse(data: requestSurveyResponseDto) {
        const busMapping: {[key: number]: number[]} = {0:[0,0],1:[1,0],2:[1,1]};
        const busValue = data.bus ?? 0;
        const surveyData = {
            'meal':data.meal,
        'transfer':{
            'own-car':data.carId,
            'bus':busMapping[busValue]}
        }
        return await prisma.application.update({
            where: {userId: data.userId},
            data: {
                userId: data.userId,
                idn: data.idn,
                surveyData: JSON.parse(JSON.stringify(surveyData))
            },
        })
    }
}

export default SurveyRepository;