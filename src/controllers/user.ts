import { Request, Response } from 'express';
import UserService from '@services/userService';
import { requestLoginUserDto, requestLogoutUserDto, requestRefreshAccessTokenDto, requestRegisterUserDto } from '@dtos/authDto';
import logger from '@utils/logger';

const userService = new UserService();

class UserController {
  async login(req: Request, res: Response) {
    try {
      const userDTO: requestLoginUserDto = req.body;
      const loginData: any = await userService.login(userDTO);
      if (loginData.ok) {
        return res.status(200).json({
          message: "Authorize success",
          accessToken: loginData.accessToken,
          refreshToken: loginData?.refreshToken,
          user: loginData.user
        });
      }
      return res.status(401).json({
        message: loginData.message,
      })
    } catch (err: any) {
      logger.error("Login controller error:", err.message)
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const userDTO: requestLogoutUserDto = req.body;
      const logoutData = await userService.logout(userDTO);
      if (logoutData.ok) {
        return res.status(200).json({
          message: "Logout success"
        });
      }
      return res.status(401).json({
        message: "Logout failed"
      });
    } catch(err: any) {
      logger.error("logout controller error:", err.message);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userDto: requestRegisterUserDto = req.body;
      await userService.register(userDto);
      return res.status(200).json({
        message: "Register success"
      })
    } catch(err: any) {
      logger.error("Register controller error:", err.message);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    try {
      const userDto: requestRefreshAccessTokenDto = req.body;
      const refreshAccessTokenData = await userService.refreshAccessToken(userDto);
      return res.status(200).json({
        message: "Refresh access token success",
        accessToken: refreshAccessTokenData.accessToken
      })
    } catch(err: any) {
      logger.error("refreshAccessToken controller error:", err.message);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async getUser(req: Request, res: Response) {
    const userDTO = req;
    try {
      // const getUser = await userService.getUser(userDTO);
      return res.json({

      });
    } catch(err: any) {
      logger.error("getUser controller error:", err.message);
      return res.status(401).json({
        message: err.message,
      })
    }
  }
}

export default UserController;