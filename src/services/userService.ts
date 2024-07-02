import { requestAuthCheckDto, requestLoginUserDto, requestLogoutUserDto, requestRefreshAccessTokenDto, requestRegisterUserDto } from "@dtos/authDto";
import bcrypt from "bcrypt";
import AuthRepository from "@repositories/authRepository";
import { user } from "@/types/default";
import JwtProvider from "@utils/jwtProvider";
import redisClient from "@utils/redis";
import { decode } from "jsonwebtoken";

const authRepository = new AuthRepository();
const jwtProvider = new JwtProvider();

class UserService {
  async login(userDTO: requestLoginUserDto) {
    try {
      const user: user | null = await authRepository.findUser(userDTO.userId);
      if (!user) {
        return ({
          ok: 0,
          message: "Unregisterd user"
        })
      };

      const isPasswordCorrect = await bcrypt.compare(userDTO.password, user.password);
      if (!isPasswordCorrect) {
        return ({
          ok: 0,
          message: "Incorrect password"
        })
      };

      const accessToken = await new Promise((resolve, reject) => {
        jwtProvider.signAccessToken(user, (err: any, accessToken: string) => {
          if (err) reject(err);
          resolve(accessToken);
        });
      });

      if (userDTO.autoLogin) {
        const refreshToken = await new Promise((resolve, reject) => {
          jwtProvider.signRefreshToken((err: any, refreshToken: string) => {
            if (err) reject(err);
            resolve(refreshToken);
          });
        });
        await redisClient.set(String(user.id), String(refreshToken));
        return ({
          ok: 1,
          message: "Authorize success",
          accessToken,
          refreshToken,
          user
        });
      }

      return ({
        ok: 1,
        message: "Authorize success",
        accessToken,
        user
      });
    } catch(err) {
      throw err;
    }
  }
  async logout(userDTO: requestLogoutUserDto) {
    try {
      let stringId = String(userDTO.id);
      const n = await redisClient.exists(stringId);
      n && await redisClient.del(stringId);
      return ({
        ok: 1,
      });
    } catch(err: any) {
      throw err;
    }
  }
  async register(userDTO: requestRegisterUserDto) {
    try {
      const user: user | null = await authRepository.findUser(userDTO.userId);
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{10,}$/;

      if (user) {
        return ({
          ok: 0,
          message: "Duplicated id"
        })
      };

      if (!userDTO) {
        return ({
          ok: 0,
          message: "Invalid request"
        });
      }
      if (!passwordPattern.test(userDTO.password)) {
        return ({
          ok: 0,
          message: "Password pattern unfulfilled"
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userDTO.password, salt);

      await authRepository.createUser(userDTO, hash);

      return ({
        ok: 1,
        message: "Register success",
      });
    } catch(err) {
      throw err;
    }
  }
  async refreshAccessToken(userDTO: requestRefreshAccessTokenDto) {
    try {
      const decodedAccessToken: any = await decode(userDTO.accessToken);
      const refreshToken: any = await redisClient.get(String(decodedAccessToken.id));
      if (userDTO.refreshToken !== refreshToken) {
        return ({
          ok: 0,
          message: "Token does not match"
        });
      }

      const verifyRefreshTokenResult = await jwtProvider.verifyRefreshToken(refreshToken);
      if (!verifyRefreshTokenResult) {
        return ({
          ok: 0,
          message: "Invaild refresh token"
        });
      }

      const accessToken = await new Promise((resolve, reject) => {
        jwtProvider.signAccessToken(decodedAccessToken, (err: any, accessToken: string) => {
          if (err) reject(err);
          resolve(accessToken);
        });
      });

      return ({
        ok: 1,
        message: "Token reissue success",
        accessToken,
      });
    } catch(err) {
      throw err;
    }
  }
  async authCheck(userDTO: requestAuthCheckDto) {
    try {
      const decodedAccessToken: any = await decode(userDTO.accessToken);
      if (!decodedAccessToken) {
        return ({
          ok: 1,
          message: "Unauthorized user"
        })
      }
      const user: user | null = await authRepository.findUser(String(decodedAccessToken.id));
      return ({
        ok: 1,
        message: "Authorized user",
        user
      });
    } catch(err) {
      throw err;
    }
  }
}

export default UserService;