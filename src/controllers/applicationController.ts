import { Request, Response } from 'express';
import logger from '@utils/logger';

import { requestApplicationResponseDto } from '@dtos/surveyDto';
import ApplicationService from '@services/applicationService';

const applicationService = new ApplicationService();

class ApplicationController {
  async getApplicationByUserId(req: Request, res: Response) {
    try {
      const applicationDto: requestApplicationResponseDto = req.body;
      const getApplicationByUserIdData: any = await applicationService.getApplicationByUserId(applicationDto);
      if (getApplicationByUserIdData.ok) {
        logger.http(`getApplicationByUserId ${getApplicationByUserIdData.application.userId}`);
        return res.status(200).json({
          message: "Success request application by userId",
          application: getApplicationByUserIdData.application
        });
      }
      return res.status(401).json({
        message: getApplicationByUserIdData.message,
      });
    } catch (err: any) {
      logger.error("Application controller error:", err)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
}

export default ApplicationController;