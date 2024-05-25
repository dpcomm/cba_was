import * as pbkdf2Password from "pbkdf2-password";
import UserRepository from "../repositories/userRepository";


const userRepository = new UserRepository();
const pbkdf2Hasher = pbkdf2Password.pbkdf2Password();

class AuthService {
  async login(userDTO) {
    try {
      const user = await userRepository.findUser();

      if (!user) {
        throw new Error("Unregisterd user");
      }

      const hash = await this.#hash(userDTO.password, user.get().salt);

      return ({
        ok: 1,
        message: "success",
      })
    } catch(err) {
      throw err;
    }
  }
  async #hash(password, salt) {
    return new Promise((resolve, reject) => {
      pbkdf2Hasher({
        password: password,
        salt: salt
      }, (err, pass, salt, hash) => {
        if (err) reject(err);
        resolve(hash)
      });
    });
  }
}

export default AuthService;