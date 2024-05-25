import { requestLoginUserDto, requestRegisterUserDto } from "@dtos/authDto";
import bcrypt from "bcrypt";
import AuthRepository from "@repositories/authRepository";
import { user } from "@/types/default";
import JwtExtractor from "@utils/jwtExtractor";
import redisClient from "@utils/redis";

const authRepository = new AuthRepository();
const jwtExtractor = new JwtExtractor();

class UserService {
  async login(userDTO: requestLoginUserDto) {
    try {
      const user: user | null = await authRepository.findUser(userDTO.userId);

      if (!user) throw new Error("Unregisterd user");

      const isPasswordCorrect = await bcrypt.compare(userDTO.password, user.password);
      if (!isPasswordCorrect) throw new Error("Incorrect password");

      const accessToken = await new Promise((resolve, reject) => {
        jwtExtractor.signAccessToken(user, (err: any, accessToken: string) => {
          if (err) reject(err);
          resolve(accessToken);
        });
      });

      if (userDTO.autoLogin) {
        const refreshToken = await new Promise((resolve, reject) => {
          jwtExtractor.signRefreshToken((err: any, refreshToken: string) => {
            if (err) reject(err);
            resolve(refreshToken);
          });
        });
        await redisClient.set(String(user.id), String(refreshToken));
        return ({
          ok: 1,
          message: "Authorize success",
          accessToken,
          refreshToken
        });
      }

      return ({
        ok: 1,
        message: "Authorize success",
        accessToken,
      });
    } catch(err) {
      throw err;
    }
  }
  async register(userDTO: requestRegisterUserDto) {
    try {
      const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{10,}$/;
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
      throw err
    }
  }
}

export default UserService;