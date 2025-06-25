import { Request, Response } from 'express';
import ChatreportService from '@services/chatreportService';
import { chatreportDto } from '@dtos/chatreportDto';
import logger from '@utils/logger';

const chatreportService = new ChatreportService();

class ChatreportController {
    async report(req: Request, res: Response) {
        try{
            const reportDTO: chatreportDto = req.body;
            const reportData: any = await chatreportService.report(reportDTO);
            if (reportData.ok) {
                logger.http(`user ${reportData.reporter} reported user ${reportData.reported} in room ${reportData.room} becasue of ${reportData.reason}`);
                return res.status(201).json({
                    message: "Report success",
                });
            }
            return res.status(400).json({
                message: reportData.message,
            });
        } catch (err: any) {
            logger.error("Report controller error:", err);
            return res.status(500).json({
                message: err.message,
                err: err,
            });
        }
    }
}

export default ChatreportController;