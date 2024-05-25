import { Request, Response } from 'express';
import UserService from '@services/userService';
import { requestLoginUserDto, requestRegisterUserDto } from '@dtos/authDto';
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
      console.log("")
      return res.status(401).json({
        message: loginData.message,
      })
    } catch (err: any) {
      logger.error("Login controller error:", err.message)
      return res.status(500).json({
        message: "Failed to login",
        err: err.message
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      console.log(req.body);
      const userDto: requestRegisterUserDto = req.body;
      console.log(req.body);
      const registerData = await userService.register(userDto);
      console.log(registerData);
      return res.status(200).json({
        message: "Register success"
      })
    } catch(err: any) {
      logger.error("Register controller error:", err.message);
      return res.status(500).json({
        message: "Failed to register",
        err: err.message
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