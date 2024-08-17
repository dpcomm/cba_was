import { Request, Response } from 'express';
import logger from '@utils/logger';
import PrayService from '@services/prayService';
import { requestCreatePrayDto } from '@dtos/prayDto';

const prayService = new PrayService();

class PrayController {
  async getAllPrays(req: Request, res: Response) {
    try {
      const getAllPrays: any = await prayService.getAllPrays();
      if (getAllPrays.ok) {
        logger.http(`getAllPrays`);
        return res.status(200).json({
          message: "Success request prays",
          prays: getAllPrays.prays,
        });
      }
      return res.status(401).json({
        message: getAllPrays.message,
      });
    } catch (err: any) {
      logger.error("Pray controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err,
      });
    }
  }

  async createPray(req: Request, res: Response) {
    try {
      const prayDto: requestCreatePrayDto = req.body;
      const createPrayData: any = await prayService.createPray(prayDto);
      if (createPrayData.ok) {
        logger.http(`createPray`);
        return res.status(200).json({
          message: "Success create pray",
        });
      }
      return res.status(401).json({
        message: createPrayData.message,
      });
    } catch (err: any) {
      logger.error("Pray controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err,
      });
    }
  }

  async deletePray(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deletePrayData: any = await prayService.deletePray(id);
      if (deletePrayData.ok) {
        logger.http(`deletePray`);
        return res.status(200).json({
          message: "Success delete pray",
        });
      }
      return res.status(401).json({
        message: deletePrayData.message,
      });
    } catch (err: any) {
      logger.error("Pray controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err,
      });
    }
  }
}

export default PrayController;
