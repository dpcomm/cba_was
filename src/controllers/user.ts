import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

const getUser = async (req: Request, res: Response) => {
  const userDTO = req;
  try {
    const getUser = await userService.getUser(userDTO);
    return res.json({

    });
  } catch(err: any) {
    console.error("getUser controller error:", err.message);
    return res.status(401).json({
      message: err.message,
    })
  }
}

export { getUser };