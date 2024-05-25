import { user } from "@/types/default";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || 'default_secret';
const expirentTime = process.env.JWT_EXPIRENTTIME || "1600";
const refreshExpirentTime = process.env.JWT_REFRESH_EXPIRENTTIME || "604800"

class JwtExtractor {
  async signAccessToken (user: user, callback: any){
    try {
      jwt.sign(
        {
          id: user.id
        },
        secret,
        {
          issuer: process.env.JWT_ISSUER,
          algorithm: "HS256",
          expiresIn: parseInt(expirentTime),
        },
        (error, token) => {
          if (error) {
            callback(error, null);
          }
          else if (token) {
            callback(null, token);
          }
        }
      );
    } catch (err) {
      console.error(err);
      callback(err, null);
    }
  };

  async signRefreshToken(callback: any) {
    try {
      jwt.sign(
        {},
        secret,
        {
          issuer: process.env.JWT_ISSUER,
          algorithm: "HS256",
          expiresIn: parseInt(refreshExpirentTime),
        },
        (error, token) => {
          if (error) {
            callback(error, null);
          }
          else if (token) {
            callback(null, token);
          }
        }
      );
    } catch (err) {
      console.error(err);
      callback(err, null);
    }
  }
}

export default JwtExtractor;