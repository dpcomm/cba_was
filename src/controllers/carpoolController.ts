
import { Request, Response } from 'express';
import logger from '@utils/logger';
import CarpoolService from '@services/carpoolService';
import FcmService from '@services/fcmService';
import {
  CreateCarpoolDto,
  UpdateCarpoolInfoDto,
  UpdateCarpoolDto,
} from '@dtos/carpoolDto';

class CarpoolController {
  constructor() {
    this.getAllCarpoolRooms = this.getAllCarpoolRooms.bind(this);
    this.getCarpoolRoomById = this.getCarpoolRoomById.bind(this);
    this.getCarpoolRoomDetail = this.getCarpoolRoomDetail.bind(this);
    this.getMyCarpoolRooms = this.getMyCarpoolRooms.bind(this);
    this.createCarpoolRoom = this.createCarpoolRoom.bind(this);
    this.editCarpoolRoom = this.editCarpoolRoom.bind(this);
    this.updateCarpoolRoom = this.updateCarpoolRoom.bind(this);
    this.deleteCarpoolRoom = this.deleteCarpoolRoom.bind(this);
    this.joinCarpoolRoom = this.joinCarpoolRoom.bind(this);
    this.leaveCarpoolRoom = this.leaveCarpoolRoom.bind(this);
    this.updateCarpoolStatus = this.updateCarpoolStatus.bind(this);
    this.sendCarpoolStartNotificationMessage = this.sendCarpoolStartNotificationMessage.bind(this);
  }
  private carpoolService = new CarpoolService();
  private fcmService = new FcmService();

  async getAllCarpoolRooms(req: Request, res: Response) {
    try {
      const result: any = await this.carpoolService.getAllCarpoolRooms();
      if (result.ok) {
        logger.http('getAllCarpools');
        return res.status(200).json({
          message: 'Success getAllCarpools',
          rooms: result.rooms,
        });
      }
      if (result.message === 'No carpool rooms found') {
        logger.http('getAllCarpools');
        return res.status(200).json({
          message: result.message,
          rooms: result.rooms
        });
      }
      return res.status(404).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#getAllCarpools error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async getCarpoolRoomById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result: any = await this.carpoolService.getCarpoolRoomById(id);

      if (result.ok) {
        logger.http(`getCarpoolById(${id})`);
        return res.status(200).json({
          message: 'Success getCarpoolById',
          room: result.room,
        });
      }

      return res.status(404).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#getCarpoolById error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async getCarpoolRoomDetail(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid carpool room ID' });
      }

      const result: any = await this.carpoolService.getCarpoolRoomDetail(id);
      if (result.ok) {
        return res.status(200).json({
          message: result.message,
          room: result.room,
        });
      }
      return res.status(404).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#getCarpoolRoomDetail error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async getMyCarpoolRooms(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const result: any = await this.carpoolService.findMyCarpoolRooms(userId);

      if (result.ok) {
        logger.http(`getMyCarpoolRooms(${userId})`);
        return res.status(200).json({
          message: 'Success getMyCarpoolRooms',
          rooms: result.rooms,
        });
      }
      if (result.message === 'No carpool rooms found') {
        logger.http('getMyCarpoolRooms');
        return res.status(200).json({
          message: result.message,
          rooms: result.rooms
        })
      }
      return res.status(404).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#getMyCarpoolRooms error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async createCarpoolRoom(req: Request, res: Response) {
    try {
      const dto: CreateCarpoolDto = req.body;
      const result: any = await this.carpoolService.createCarpoolRoom(dto);

      if (result.ok) {
        logger.http('createCarpool');
        return res.status(201).json({
          message: 'Success createCarpool',
          room: result.room,
        });
      }

      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#createCarpool error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async editCarpoolRoom(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto: UpdateCarpoolInfoDto = req.body;
      const result: any = await this.carpoolService.editCarpoolRoom(id, dto);

      if (result.ok) {
        logger.http(`editCarpool(${id})`);
        return res.status(200).json({
          message: 'Success editCarpool',
          room: result.room,
        });
      }

      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#editCarpool error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async updateCarpoolRoom(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto: UpdateCarpoolDto = req.body;
      const result: any = await this.carpoolService.updateCarpoolRoom(id, dto);

      if (result.ok) {
        logger.http(`updateCarpool(${id})`);
        return res.status(200).json({
          message: 'Success updateCarpool',
          room: result.room,
        });
      }

      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#updateCarpool error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async deleteCarpoolRoom(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result: any = await this.carpoolService.deleteCarpoolRoom(id);

      if (result.ok) {
        logger.http(`deleteCarpool(${id})`);
        return res.status(200).json({ message: 'Success deleteCarpool' });
      }

      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#deleteCarpool error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async joinCarpoolRoom(req: Request, res: Response) {
    try {
      const { userId, roomId } = req.body;
      const result: any = await this.carpoolService.joinCarpoolRoom(userId, roomId);
      if (result.ok) {
        logger.http(`joinCarpoolRoom user:${userId} room:${roomId}`);
        return res.status(201).json({ message: 'Success joinCarpool' });
      }
      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#joinCarpoolRoom error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async leaveCarpoolRoom(req: Request, res: Response) {
    try {
      const { userId, roomId } = req.body;
      const result: any = await this.carpoolService.leaveCarpoolRoom(userId, roomId);
      if (result.ok) {
        logger.http(`leaveCarpoolRoom user:${userId} room:${roomId}`);
        return res.status(200).json({ message: 'Success leaveCarpool' });
      }
      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#leaveCarpoolRoom error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async updateCarpoolStatus(req: Request, res: Response) {
    try {
      const { roomId, newStatus } = req.body;
      const result: any = await this.carpoolService.updateCarpoolStatus(roomId, newStatus);
      if (result.ok) {
        logger.http(`updateCarpoolStatus room:${roomId}, newStatus:${newStatus}`);
        return res.status(200).json({ message: 'Success updateCarpoolStatus' });
      }
      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#updateCarpoolStatus error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }

  async sendCarpoolStartNotificationMessage(req: Request, res: Response) {
    try {
      const roomId = Number(req.params.id);
      const result: any = await this.fcmService.sendCarpoolStartNotificationMessage(roomId);
      
      if (result.ok) {
        logger.http(`sendCarpoolStartNotificationMessage room:${roomId}`);
        return res.status(200).json({ message: 'Success sendStartMessages' });
      }
      return res.status(400).json({ message: result.message });
    } catch (err: any) {
      logger.error('CarpoolController#sendCarpoolStartNotificationMessage error:', err);
      return res.status(500).json({ message: err.message, err });
    }
  }
}

export default CarpoolController;
