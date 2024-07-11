import { requestApplicationDto } from '@dtos/surveyDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class ApplicationRepository {
    async createApplication(surveyDTO: requestApplicationDto) {
        const surveyData = {
            'meal':surveyDTO.meal,
        'transfer':{
            'transfer':surveyDTO.transfer,
            'own-car':surveyDTO.carId,
            'bus':surveyDTO.bus
            }
        }
        return await prisma.application.create({
            data : {
                userId: surveyDTO.userId,
                idn: "000000-0000000",
                surveyData: JSON.parse(JSON.stringify(surveyData)),
                attended: false,
                feePaid: false,
                retreatId: 1
            }
        });
    }

    async updateApplication(surveyDTO: requestApplicationDto) {
        const surveyData = {
            'meal':surveyDTO.meal,
        'transfer':{
            'transfer':surveyDTO.transfer,
            'own-car':surveyDTO.carId,
            'bus':surveyDTO.bus
            }
        }
        return await prisma.application.update({
            where: {userId: surveyDTO.userId},
            data: {
                userId: surveyDTO.userId,
                idn: "000000-0000000",
                surveyData: JSON.parse(JSON.stringify(surveyData))
            },
        })
    }
	async findApplicationByUserId(userId: string) {
		return await prisma.application.findUnique({
			where: { userId: userId },
		});
	}
}

export default ApplicationRepository;