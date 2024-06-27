import UserController from "@controllers/user";
import express from "express";

import AdminController from "@controllers/admin";
import verifyAuth from "@middlewares/verifyAuth";

const userRouter = express.Router();
const userController = new UserController();
const admincontroller = new AdminController();

userRouter.get('/', userController.getUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refreshAccessToken);
userRouter.post('/survey', userController.surveyResponse);
userRouter.post('/getExistSurvey', userController.getResponse);

userRouter.get('/backoffice',admincontroller.UserTable);
userRouter.post('/retreat-application',userController.surveyResponse);
userRouter.post('/updateUser',userController.updateUser);
userRouter.post('/checkuser',verifyAuth,userController.checkUser);

export default userRouter;