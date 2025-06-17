import { Request, Response } from 'express';
import FcmService from '@services/fcmService';
import { requestRefreshTokenDto, requestRegistTokenDto, requestDeleteTokenDto } from '@dtos/fcmTokenDto';
import logger from '@utils/logger';

const fcmService = new FcmService();

class FcmTokenController {
    async registToken(req: Request, res: Response) {
        try {
            const tokenDTO: requestRegistTokenDto = req.body;
            const registData: any = await fcmService.registToken(tokenDTO);
            if (registData.ok) {
                logger.http(`Token Regist ${registData.userId} ${registData.token}`);

                await fcmService.addFirebaseToken(registData.userId, registData.token);

                return res.status(201).json({
                    message: "Token Regist success",
                    userId: registData.userId,
                    token: registData.token,
                });
            }
            console.log(`user ${registData.userId} regist token ${registData.token}`);
            return res.status(400).json({
                message: registData.message,
            });
        } catch (err: any) {
            logger.error("FCM Token register error:", err);
            return res.status(500).json({
                message: err.message,
                err: err
            });
        }

    }

    async deleteToken(req: Request, res: Response) {
        try {
            const tokenDTO: requestDeleteTokenDto = req.body;
            const removeData: any = await fcmService.deleteToken(tokenDTO);
            if (removeData.ok) {
                logger.http(`Token Remove ${removeData.token}`);

                await fcmService.removeFirebaseToken(removeData.userId, removeData.token);

                return res.status(200).json({
                    message: "Token Remove success",
                    token: removeData.token,
                });
            }
            console.log(`remove token ${tokenDTO.token}`);
            return res.status(400).json({
                message: removeData.message,
            });
        } catch (err: any) {
            logger.error("FCM Token remove error:", err);
            return res.status(500).json({
                message: err.message,
                err: err
            });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshTokenDTO: requestRefreshTokenDto = req.body;
            const removeTokenDTO: requestDeleteTokenDto = {token: refreshTokenDTO.oldToken};
            const registTokenDTO: requestRegistTokenDto = {userId: refreshTokenDTO.userId, token: refreshTokenDTO.newToken};

            const removeData: any = await fcmService.deleteToken(removeTokenDTO);
            const registData: any = await fcmService.registToken(registTokenDTO);

            if (removeData.ok && registData.ok) {
                logger.http(`Token Refresh ${refreshTokenDTO.oldToken} to ${refreshTokenDTO.newToken}`);

                await fcmService.removeFirebaseToken(removeData.userId, removeData.token);                
                await fcmService.addFirebaseToken(registData.userId, registData.token);

                return res.status(200).json({
                    message: "Token Refresh success",
                    userId: refreshTokenDTO.userId,
                    oldToken: refreshTokenDTO.oldToken,
                    newToken: refreshTokenDTO.newToken,
                });
            }
            console.log(`refresh token ${refreshTokenDTO.oldToken} to ${refreshTokenDTO.newToken}`);
            return res.status(400).json({
                message: removeData.message + registData.message,
            });
        } catch (err: any) {
            logger.error("FCM Token refresh error:", err);
            return res.status(500).json({
                message: err.message,
                err: err
            });
        }
    }
}

export default FcmTokenController;