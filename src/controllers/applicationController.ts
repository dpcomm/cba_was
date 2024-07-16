import { Request, Response } from 'express';
import logger from '@utils/logger';
import ApplicationService from '@services/applicationService';
import { EditApplicationAttendedAndFeePaidDtoType, requestApplicationDto } from '@dtos/surveyDto';

const applicationService = new ApplicationService();

class ApplicationController {
  async getApplicationByUserId(req: Request, res: Response) {
    try {
      const userId: string = req.params['user'];
      const getApplicationByUserIdData: any = await applicationService.getApplicationByUserId(userId);
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
  async getApplication(req: Request, res: Response) {
    try {
      const getAllApplicationData = await applicationService.getAllApplication()
      if (getAllApplicationData.ok) {
        return res.status(200).json({
          message: getAllApplicationData.message,
          application: getAllApplicationData.application
        });
      }
      return res.status(401).json({
        message: getAllApplicationData.message,
      });
    } catch (err: any) {
      logger.error("Application controller error:", err)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
  async EditApplicationAttendedAndFeePaid(req: Request, res: Response) {
    const applicationDto: EditApplicationAttendedAndFeePaidDtoType = req.body;
    console.log(applicationDto);
    try {
      const editApplicationAttendedAndFeePaidData: any = await applicationService.updateApplicationAttendedAndFeePaid(applicationDto);
      if (editApplicationAttendedAndFeePaidData.ok) {
        return res.status(200).json({
          message: editApplicationAttendedAndFeePaidData
        });

      }
      return res.status(401).json({
        message: editApplicationAttendedAndFeePaidData.message
      });
    } catch(err: any) {
      logger.error("Application controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
  async postApplication(req: Request, res: Response) {
    try {
      const surveyDto: requestApplicationDto = req.body;
      const getApplicationByUserIdData: any = await applicationService.getApplicationByUserId(surveyDto.userId);
      if (getApplicationByUserIdData.ok) {
          const updateApplication: any = await applicationService.updateApplication(surveyDto);
          if (updateApplication.ok) {
            return res.status(200).json({
              message: "Survey Update Success"
            });
          }
          return res.status(401).json({
            message: updateApplication.message
          });
      }
      const ApplicationData = await applicationService.addApplication(surveyDto);
      if (ApplicationData.ok) {
        return res.status(200).json({
          message: "Survey Add Success"
        });
      }
      return res.status(401).json({
        message: ApplicationData.message
      });
    } catch(err: any) {
      logger.error("Survey controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
}

export default ApplicationController;