import { CreateCarpoolDto, UpdateCarpoolDto } from "@dtos/carpoolDto";
import CarpoolRoomRepository from "@repositories/carpoolRoomRepository";

class CarpoolService {
  private carpoolRoomRepository = new CarpoolRoomRepository();

  async getAllCarpoolRooms() {
    try {
      console.log('getAllCarpoolasdf called');
      const rooms = await this.carpoolRoomRepository.findAll();
      if (!rooms || rooms.length === 0) {
        return {
          ok: 0,
          message: 'No carpool rooms found',
          rooms
        };
      }
      return {
        ok: 1,
        message: 'getAllCarpools success',
        rooms
      };
    } catch (err) {
      throw err;
    }
  }

  async getCarpoolRoomById(id: number) {
    try {
      const room = await this.carpoolRoomRepository.findById(id);
      if (!room) {
        return {
          ok: 0,
          message: `Carpool ${id} not found`
        };
      }
      return {
        ok: 1,
        message: 'getCarpoolById success',
        room
      };
    } catch (err) {
      throw err;
    }
  }

  /* 아마 이때 채팅방 열어어 할 듯. */
  async createCarpoolRoom(dto: CreateCarpoolDto) {
    try {
      const room = await this.carpoolRoomRepository.create(dto);
      if (!room) {
        return {
          ok: 0,
          message: 'Failed to create carpool'
        };
      }
      return {
        ok: 1,
        message: 'createCarpool success',
        room
      };
    } catch (err) {
      throw err;
    }
  }

  async updateCarpoolRoom(id: number, dto: UpdateCarpoolDto) {
    try {
      const room = await this.carpoolRoomRepository.update(id, dto);
      if (!room) {
        return {
          ok: 0,
          message: `Failed to update carpool ${id}`
        };
      }
      return {
        ok: 1,
        message: 'updateCarpool success',
        room
      };
    } catch (err) {
      throw err;
    }
  }

  async deleteCarpoolRoom(id: number) {
    try {
      const result = await this.carpoolRoomRepository.delete(id);
      if (!result) {
        return {
          ok: 0,
          message: `Failed to delete carpool ${id}`
        };
      }
      return {
        ok: 1,
        message: 'deleteCarpool success'
      };
    } catch (err) {
      throw err;
    }
  }
}

export default CarpoolService;