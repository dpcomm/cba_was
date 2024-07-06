import { requestRegisterUserDto, updateUserDto } from '@dtos/authDto';
import { PrismaClient } from '@prisma/client'
import UserService from '@services/userService';

const prisma = new PrismaClient()

class AuthRepository {
  async createUser(userDTO: requestRegisterUserDto, hash: string) {
    const groupValue = userDTO.group === "기타" ? userDTO.etcGroup || userDTO.group : userDTO.group;
    return await prisma.user.create({
      data: {
        userId: userDTO.userId,
        password: hash,
        name: userDTO.name,
        group: groupValue,
        phone: userDTO.phone,
        birth: new Date(userDTO.birth),
        gender: userDTO.gender,
        // rank: "M"
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
  async updateUser(updateDTO: updateUserDto, hash: string) {
    return await prisma.user.update({
      where: {userId: updateDTO.userId},
      data: {
        name: updateDTO.name,
        password: hash,
        group: updateDTO.group,
        phone: updateDTO.phone,
        birth: new Date(updateDTO.birth),
        gender: updateDTO.gender
      },
    });
  }
}


export default AuthRepository;