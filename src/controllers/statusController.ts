import { Request, Response } from 'express';
import logger from '@utils/logger';
import version from '@config/version.json';

class StatusController {
  async getApplicationVersion(req: Request, res: Response) {
    try {
      logger.http('Version check successful');
      return res.status(200).json({
        message: 'Version check successful',
        version: version.application,
      });
    } catch (err: any) {
      logger.error('Status controller error:', err);
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  }
}

export default StatusController;
