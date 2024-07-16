import { EditApplicationAttendedAndFeePaidDtoType, requestApplicationDto } from '@dtos/surveyDto';
import { PrismaClient } from '@prisma/client';
import { FindApplicationType } from '../types';

const prisma = new PrismaClient()

class ApplicationRepository {
	async findApplication() {
		const applications = await prisma.application.findMany({
			select: {
				id: true,
				attended: true,
				feePaid: true,
				surveyData: true,
				user: {
					select: {
						name: true
					}
				},
				retreat: {
					select: {
						title: true
					}
				}
			}
		});

		return applications.map(data => ({
			id: data.id,
			attended: data.attended,
			feePaid: data.feePaid,
			transfer: Object(applications[0].surveyData).transfer.transfer,
			ownCar: Object(applications[0].surveyData).transfer['own-car'],
			bus: Object(applications[0].surveyData).transfer.bus,
			name: data.user.name,
			title: data.retreat.title
		}));
	}
	async createApplication(surveyDTO: requestApplicationDto) {
		const surveyData = {
			'meal':surveyDTO.meal,
			'transfer': {
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
			'transfer': {
				'transfer':surveyDTO.transfer,
				'own-car':surveyDTO.carId,
				'bus':surveyDTO.bus
			}
		}
		return await prisma.application.update({
			where: { userId: surveyDTO.userId },
			data: {
				userId: surveyDTO.userId,
				idn: "000000-0000000",
				surveyData: JSON.parse(JSON.stringify(surveyData))
			},
		});
	}
	async findApplicationByUserId(userId: string) {
		return await prisma.application.findUnique({
			where: { userId: userId },
		});
	}
	async updateApplicationAttendedAndFeePaid(applicationDto: EditApplicationAttendedAndFeePaidDtoType) {
		return await prisma.application.update({
			where: { id: applicationDto.id },
			data: {
				attended: applicationDto.attended,
				feePaid: applicationDto.feePaid
			}
		})
	}
}

export default ApplicationRepository;