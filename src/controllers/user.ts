import { Request, Response } from 'express';
import UserService from '@services/userService';
import {
  requestAuthCheckDto,
  requestLoginUserDto,
  requestLogoutUserDto,
  requestRefreshAccessTokenDto,
  requestRegisterUserDto,
  checkUserDto,
  updateUserDto,
  resetPasswordDto
} from '@dtos/authDto';
import logger from '@utils/logger';


const userService = new UserService();

class UserController {
  async login(req: Request, res: Response) {
    try {
      const userDTO: requestLoginUserDto = req.body;
      const loginData: any = await userService.login(userDTO);
      if (loginData.ok) {
        logger.http(`Login ${loginData.user.name} ${loginData.user.userId}`);
        return res.status(200).json({
          message: "Authorize success",
          accessToken: loginData.accessToken,
          refreshToken: loginData?.refreshToken,
          user: loginData.user
        });
      }
      return res.status(401).json({
        message: loginData.message,
      });
    } catch (err: any) {
      logger.error("Login controller error:", err)
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
    } catch (err: any) {
      logger.error("logout controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userDto: requestRegisterUserDto = req.body;
      const registerData = await userService.register(userDto);
      if (registerData.ok) {
        return res.status(200).json({
          message: "Register success"
        });
      }
      return res.status(401).json({
        message: registerData.message
      });
    } catch (err: any) {
      logger.error("Register controller error:", err);
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
      if (refreshAccessTokenData.ok) {
        return res.status(200).json({
          message: "Refresh access token success",
          accessToken: refreshAccessTokenData.accessToken
        })
      }
      return res.status(401).json({
        message: refreshAccessTokenData.message
      });
    } catch (err: any) {
      logger.error("refreshAccessToken controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId: string = req.params['user'];
      if (userId) {
        const getUserByUserIdData = await userService.getUserByUserId(userId);
        if (getUserByUserIdData.ok) {
          return res.status(200).json({
            message: getUserByUserIdData.message,
            user: getUserByUserIdData.user
          });
        }
        return res.status(401).json({
          message: getUserByUserIdData.message,
        });
      }
      const getAllUserData = await userService.getAllUser();
      if (getAllUserData.ok) {
        return res.status(200).json({
          message: getAllUserData.message,
          user: getAllUserData.user
        });
      }
      return res.status(401).json({
        message: getAllUserData.message,
      });
    } catch (err: any) {
      logger.error("getUser controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }

  async authCheck(req: Request, res: Response) {
    const userDTO: requestAuthCheckDto = req.body;
    try {
      const authCheckData = await userService.authCheck(userDTO);
      if (authCheckData.ok) {
        return res.status(200).json({
          message: authCheckData.message,
          user: authCheckData.user,
        })
      }
      return res.status(401).json({
        message: authCheckData.message
      });
    } catch (err: any) {
      logger.error("authCheck controller error:", err);
      return res.status(500).json({
        message: err.message,
      })
    }
  }
  async updateUser(req:Request,res:Response) {
    try {
      const updateDto: updateUserDto = req.body;
      const updateData = await userService.updateUserInfo(updateDto);
      if (updateData.ok) {
        return res.status(200).json({
          message: "User Update Success"
        });
      }
      return res.status(401).json({
        message: updateData.message
      });
    } catch (err: any) {
      logger.error("Update controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
  async checkUser(req: Request, res: Response) {
    try {
      const checkUserDto: checkUserDto = req.body;
      if (checkUserDto.password) {
        /* userId, password로 본인인증 진행 */
        const checkData = await userService.checkUserInfo(checkUserDto);
        if (checkData.ok) {
          return res.status(200).json({
            message: "본인인증 완료",
            data: checkData.data
          });
        }
        return res.status(401).json({
          message: checkData.message
        });
      }
      /* 비밀번호를 제외한 정보로 본인인증 진행 */
      const checkUserWithoutPassword = await userService.checkUserWithoutPassword(checkUserDto);
      if (checkUserWithoutPassword.ok) {
        return res.status(200).json({
          message: "Success check user without password",
          user: checkUserWithoutPassword.user
        });
      }
      return res.status(401).json({
        message: checkUserWithoutPassword.message
      });
    } catch (err: any) {
      logger.error("checkUser controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const userDto: resetPasswordDto = req.body;
      const resetData = await userService.resetPassword(userDto);
      if (resetData.ok) {
        return res.status(200).json({
          message: "Password reset success"
        });
      }
      return res.status(401).json({
        message: resetData.message
      });
    } catch (err: any) {
      logger.error("resetPassword controller error:", err);
      return res.status(500).json({
        message: err.message,
        err: err
      });
    }
  }
}



export default UserController;