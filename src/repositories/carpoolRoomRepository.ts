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
        isArrived: false,
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

  async delete(id: number): Promise<CarpoolRoom> {
    return prisma.carpoolRoom.delete({ where: { id } });
  }
}