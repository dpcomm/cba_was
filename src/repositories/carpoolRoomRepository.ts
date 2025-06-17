import { PrismaClient, CarpoolRoom } from '@prisma/client';
import { CreateCarpoolDto, UpdateCarpoolDto } from '@dtos/carpoolDto';

const prisma = new PrismaClient();

export default class CarpoolRoomRepository {
  async findAll(
    origin?: string,
    destination?: string,
  ): Promise<CarpoolRoom[]> {
    return prisma.carpoolRoom.findMany({
      where: {
        origin: origin ? { contains: origin } : undefined,
        destination: destination ? { equals: destination } : undefined,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        driver: { select: { id: true, name: true } },
      },
    });
  }

  async findById(id: number): Promise<CarpoolRoom | null> {
    return prisma.carpoolRoom.findUnique({
      where: { id },
      include: {
        driver: {
          select: { id: true, name: true, phone: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, phone: true }
            },
          },
        },
        chats: {
          include: {
            sender: { select: { id: true, name: true } },
          },
          orderBy: { timestamp: 'asc' },
        },
      },
    });
  }

  async findMyCarpools(userId: number): Promise<CarpoolRoom[]> {
    return prisma.carpoolRoom.findMany({
      where: {
        OR: [
          { driverId: userId }, // 사용자가 해당 카풀의 운전자인 경우
          {
            members: { // 사용자가 CarpoolMember로 참여하고 있는 경우 (CarpoolMember 테이블 조인)
              some: { // '어떤' CarpoolMember라도 해당 userId를 가지는지 확인
                userId: userId,
              },
            },
          },
        ],
      },
      orderBy: { departureTime: 'asc' }, // 출발 시간 기준으로 정렬
      include: {
        driver: { select: { id: true, name: true, phone: true, } }, // 운전자 정보 포함
        // 추가로 멤버 정보 가져오기
        members: {
          include: {
            user: { select: { id: true, name: true, phone: true, } }
          }
        }
      },
    });
  }

  async create(dto: CreateCarpoolDto): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.create({
      data: {
        driverId: dto.driverId,
        carInfo: dto.carInfo,
        departureTime: dto.departureTime,
        origin: dto.origin,
        originDetailed: dto.originDetailed ?? null,
        destination: dto.destination,
        destinationDetailed: dto.destinationDetailed ?? null,
        seatsTotal: dto.seatsTotal,
        seatsLeft: dto.seatsTotal,
        note: dto.note,
        originLat: dto.originLat,
        originLng: dto.originLng,
        destLat: dto.destLat,
        destLng: dto.destLng,
      },
    });
  }

  async update(id: number, dto: UpdateCarpoolDto): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.update({
      where: { id },
      data: {
        carInfo: dto.carInfo,
        departureTime: dto.departureTime,
        origin: dto.origin,
        originDetailed: dto.originDetailed ?? null,
        destination: dto.destination,
        destinationDetailed: dto.destinationDetailed ?? null,
        seatsTotal: dto.seatsTotal,
        seatsLeft: dto.seatsLeft,
        note: dto.note,
        originLat: dto.originLat,
        originLng: dto.originLng,
        destLat: dto.destLat,
        destLng: dto.destLng,
        isArrived: dto.isArrived,
      },
    });
  }

  async decrementSeatsLeft(roomId: number, amount = 1): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.update({
      where: { id: roomId },
      data: {
        seatsLeft: { decrement: amount },
        isArrived: false,
      },
    });
  }

  async incrementSeatsLeft(roomId: number, amount = 1): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.update({
      where: { id: roomId },
      data: {
        seatsLeft: { increment: amount },
        isArrived: false,
      },
    });
  }

  async delete(id: number): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.delete({ where: { id } });
  }
}