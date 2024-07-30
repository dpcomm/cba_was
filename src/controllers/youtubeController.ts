import { Request, Response } from 'express';
import logger from '@utils/logger';
import YoutubeService from '@services/youtubeService';
import { requestCreateYoutubeDto } from '@dtos/youtubeDto';

const youtubeService = new YoutubeService();

class YoutubeController {
  async getYoutube(req: Request, res: Response) {
    try {
      const getAllYoutube: any = await youtubeService.getAllYoutube();
      if (getAllYoutube.ok) {
        logger.http(`getAllYoutube`);
        return res.status(200).json({
          message: "Success request youtube",
          youtube: getAllYoutube.youtube
        });
      }
      return res.status(401).json({
        message: getAllYoutube.message,
      });
    } catch (err: any) {
      logger.error("Youtube controller error:", err)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }


  async createYoutube(req: Request, res: Response) {
    try {
      const youtubeDto: requestCreateYoutubeDto = req.body;
      const createYoutubeData: any = await youtubeService.createYoutube(youtubeDto);
      if (createYoutubeData.ok) {
        logger.http(`createYoutube`);
        return res.status(200).json({
          message: "Success create youtube link"
        });
      }
      return res.status(401).json({
        message: createYoutubeData.message,
      });
    } catch (err: any) {
      logger.error("Youtube controller error:", err)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
}

export default YoutubeController;