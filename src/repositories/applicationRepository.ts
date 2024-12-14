import { EditApplicationAttendedAndFeePaidDtoType, requestApplicationDto } from '@dtos/surveyDto';
import { PrismaClient } from '@prisma/client';
import { FindApplicationType } from '../types';

const prisma = new PrismaClient();

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
            name: true,
          },
        },
        retreat: {
          select: {
            title: true,
          },
        },
      },
    });
    return applications.map((data: any) => ({
      id: data.id,
      attended: data.attended,
      feePaid: data.feePaid,
      transfer: data.surveyData.transfer.transfer,
      ownCar: data.surveyData.transfer['own-car'],
      bus: data.surveyData.transfer.bus,
      isLeader: data.surveyData.isLeader,
      name: data.user.name,
      title: data.retreat.title,
    }));
  }

  async createApplication(surveyDTO: requestApplicationDto) {
    const surveyData = {
      meal: surveyDTO.meal,
      transfer: {
        transfer: surveyDTO.transfer,
        'own-car': surveyDTO.carId,
        bus: surveyDTO.bus,
      },
      isLeader: surveyDTO.isLeader,
    };

    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_retreatId: {
          userId: surveyDTO.userId,
          retreatId: surveyDTO.retreatId,
        },
      },
    });

    if (existingApplication) {
      throw new Error(
        `Application already exists for userId: ${surveyDTO.userId} and retreatId: ${surveyDTO.retreatId}.`
      );
    }

    return await prisma.application.create({
      data: {
        userId: surveyDTO.userId,
        idn: '000000-0000000',
        surveyData: JSON.parse(JSON.stringify(surveyData)),
        attended: false,
        feePaid: false,
        retreatId: surveyDTO.retreatId,
      },
    });
  }

  async updateApplication(surveyDTO: requestApplicationDto) {
    const surveyData = {
      meal: surveyDTO.meal,
      transfer: {
        transfer: surveyDTO.transfer,
        'own-car': surveyDTO.carId,
        bus: surveyDTO.bus,
      },
      isLeader: surveyDTO.isLeader,
    };

    return await prisma.application.update({
      where: {
        userId_retreatId: {
          userId: surveyDTO.userId,
          retreatId: surveyDTO.retreatId,
        },
      },
      data: {
        surveyData: JSON.parse(JSON.stringify(surveyData)),
        idn: '000000-0000000',
      },
    });
  }

	async findApplicationByUserIdAndRetreatId(userId: string, retreatId?: number) {
		if (retreatId) {
			return await prisma.application.findUnique({
				where: {
					userId_retreatId: {
						userId,
						retreatId,
					},
				},
			});
		}

		return await prisma.application.findMany({
			where: {
				userId,
			},
			include: {
				retreat: true,
			},
		});
	}


  async updateApplicationAttendedAndFeePaid(applicationDto: EditApplicationAttendedAndFeePaidDtoType) {
    return await prisma.application.update({
      where: { id: applicationDto.id },
      data: {
        attended: applicationDto.attended,
        feePaid: applicationDto.feePaid,
      },
    });
  }
}

export default ApplicationRepository;
