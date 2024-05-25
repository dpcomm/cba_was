import UserController from "@controllers/user";
import express from "express";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', userController.getUser);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);

export default userRouter;