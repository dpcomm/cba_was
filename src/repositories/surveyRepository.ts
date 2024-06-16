import { requestSurveyResponseDto } from '@dtos/surveyDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class SurveyRepository {
    async CreateSurvey(surveyDTO: requestSurveyResponseDto) {
        return await prisma.surveyResponse.create({
            data : {
                userId: surveyDTO.userId,
                role: surveyDTO.role,
                breakfastDay1: surveyDTO.breakfastDay1, // 허수를 둬야할지 고민해야함
                lunchDay1: surveyDTO.lunchDay1,
                dinnerDay1: surveyDTO.dinnerDay1,
                breakfastDay2: surveyDTO.breakfastDay2,
                lunchDay2: surveyDTO.lunchDay2,
                dinnerDay2: surveyDTO.dinnerDay2,
                breakfastDay3: surveyDTO.breakfastDay3,
                lunchDay3: surveyDTO.lunchDay3,
                transportType: surveyDTO.transportType,
                carPlate: surveyDTO.carPlate,
                ssn: surveyDTO.ssn,
                insurance: surveyDTO.insurance
            }
        })
    }
    async findResponse(userId: string) {
        return await prisma.surveyResponse.findUnique({
            where: {
                userId: userId
            }
        });
    }
    async updateResponse(data: requestSurveyResponseDto) {
        return await prisma.surveyResponse.update({
            where: {userId: data.userId},
            data: data,
        })
    }
}

export default SurveyRepository;