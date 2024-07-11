import UserController from "@controllers/user";
import verifyAuth from "@middlewares/verifyAuth";
import express from "express";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/:user?', userController.getUser);
userRouter.post('/', verifyAuth, userController.authCheck);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refreshAccessToken);
userRouter.post('/update', verifyAuth, userController.updateUser);
userRouter.post('/checkuser', verifyAuth, userController.checkUser);

export default userRouter;