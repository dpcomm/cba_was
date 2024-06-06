import { requestRegisterUserDto } from '@dtos/authDto';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class AuthRepository {
  async createUser(userDTO: requestRegisterUserDto, hash: string) {
    return await prisma.user.create({
      data: {
        userId: userDTO.userId,
        password: hash,
        name: userDTO.name,
        group: userDTO.group,
        phone: userDTO.phone,
        birth: new Date(userDTO.birth),
        gender: userDTO.gender,
        role: "M"
      }
    });
  }
  async findUser(userId: string) {
    return await prisma.user.findUnique({
      where: {
        userId: userId
      }
    });
  }
}

export default AuthRepository;