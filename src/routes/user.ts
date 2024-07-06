import UserController from "@controllers/user";
import AdminController from "@controllers/admin";
import verifyAuth from "@middlewares/verifyAuth";
import express from "express";

const userRouter = express.Router();
const userController = new UserController();
const admincontroller = new AdminController();

userRouter.post('/', verifyAuth, userController.authCheck);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refreshAccessToken);

userRouter.get('/backoffice',admincontroller.UserTable);
userRouter.post('/updateUser',userController.updateUser);
userRouter.post('/checkuser',verifyAuth,userController.checkUser);

export default userRouter;