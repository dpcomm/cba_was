import { requestApplicationResponseDto, requestSurveyResponseDto } from '@dtos/surveyDto';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

class SurveyRepository {
    async CreateSurvey(surveyDTO: requestSurveyResponseDto) {
        const busMapping: {[key: number]: number[]} = {0:[1,1],1:[1,0],2:[0,1]};
        const busValue = surveyDTO.bus ?? 0;
        const surveyData = {
            'meal':surveyDTO.meal,
        'transfer':{
            'transfer':surveyDTO.transfer,
            'own-car':surveyDTO.carId,
            'bus':busMapping[busValue]}
        }
        return await prisma.application.create({
            data : {
                userId: surveyDTO.userId,
                idn: surveyDTO.idn,
                surveyData: JSON.parse(JSON.stringify(surveyData)),
                attended: false,
                feePaid: false,
                retreatId: 1
            }
        });
    }
    async findResponse(userId: string) {
        function mapArrayToInteger(array:number[]) {
            // 배열의 조합을 정수로 매핑
            if (array[0] === 1 && array[1] === 1) return 0; //왕복
            if (array[0] === 1 && array[1] === 0) return 1; //본당-안산
            if (array[0] === 0 && array[1] === 1) return 2; //안산-본당
            // 이외의 경우(예상치 못한 입력)
            return 0;
        }
        const surveyData: any = await prisma.application.findUnique({
            where: {
                userId: userId
            }
        });
        if (surveyData) surveyData.surveyData['transfer']['bus'] = mapArrayToInteger(surveyData.surveyData['transfer']['bus'])

        return surveyData
    }
    async updateResponse(data: requestSurveyResponseDto) {
        const busMapping: {[key: number]: number[]} = {0:[1,1],1:[1,0],2:[0,1]};
        const busValue = data.bus ?? 0;
        const surveyData = {
            'meal':data.meal,
        'transfer':{
            'transfer':data.transfer,
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
	async findApplicationByUserId(applicationDto: requestApplicationResponseDto) {
        console.log(applicationDto.userId);
		return await prisma.application.findUnique({
			where: { userId: "profitia" },
		});
	}
}

export default SurveyRepository;