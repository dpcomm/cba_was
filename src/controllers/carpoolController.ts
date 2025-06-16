
import { Request, Response } from 'express';
import logger from '@utils/logger';
import CarpoolService from '@services/carpoolService';
import {
  CreateCarpoolDto,
  UpdateCarpoolDto,
} from '@dtos/carpoolDto';

class CarpoolController {
  constructor() {
    this.getAllCarpoolRooms = this.getAllCarpoolRooms.bind(this);
    this.getCarpoolRoomById = this.getCarpoolRoomById.bind(this);
    this.getMyCarpoolRooms = this.getMyCarpoolRooms.bind(this);
    this.createCarpoolRoom = this.createCarpoolRoom.bind(this);
    this.updateCarpoolRoom = this.updateCarpoolRoom.bind(this);
    this.deleteCarpoolRoom = this.deleteCarpoolRoom.bind(this);
  }
  private carpoolService = new CarpoolService();

  async getAllCarpoolRooms(req: Request, res: Response) {
    try {
      console.log('getAllCarpools called');
      const result: any = await this.carpoolService.getAllCarpoolRooms();
      console.log("결과", result);
      if (result.ok) {
        logger.http('getAllCarpools');
        return res.status(200).json({
          message: 'Success getAllCarpools',
          rooms: result.rooms,
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

  async getMyCarpoolRooms(req: Request, res: Response) {
    try {
      const userId = Number(req.query.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ message: '유효한 userId가 필요합니다.' });
      }
    
      const result: any = await this.carpoolService.findMyCarpoolRooms(userId); 

      if (result.ok) {
        logger.http(`getMyCarpoolRooms(userId: ${userId})`);
        return res.status(200).json({
          message: 'Success getMyCarpoolRooms',
          rooms: result.rooms,
        });
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
}

export default CarpoolController;
