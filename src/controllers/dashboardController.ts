import { Request, Response } from 'express';
import logger from '@utils/logger';
import DashboardService from '@services/dashboardService';

const dashboardService = new DashboardService();

class DashboardController {
  async getDashboard(req: Request, res: Response) {
    try {
      const getDashboard: any = await dashboardService.getDashboard();
      if (getDashboard.ok) {
        logger.http(`getAllYoutube`);
        return res.status(200).json({
          message: "Success request dashboard",
          data: getDashboard.data
        });
      }
      return res.status(401).json({
        message: getDashboard.message,
      });
    } catch (err: any) {
      logger.error("Dashboard controller error:", err)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
}

export default DashboardController;