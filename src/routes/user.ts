import UserController from "@controllers/user";
import verifyAuth from "@middlewares/verifyAuth";
import express from "express";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', verifyAuth, userController.authCheck);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refreshAccessToken);

export default userRouter;