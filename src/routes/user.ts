import UserController from "@controllers/user";
import AdminController from "@controllers/admin";
import verifyAuth from "@middlewares/verifyAuth";
import express from "express";
import ApplicationController from "@controllers/applicationController";

const userRouter = express.Router();
const userController = new UserController();
const applicationController = new ApplicationController();
const admincontroller = new AdminController();

userRouter.post('/', verifyAuth, userController.authCheck);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refreshAccessToken);
userRouter.post('/application', applicationController.getApplicationByUserId);
userRouter.post('/survey', userController.surveyResponse);
userRouter.post('/getExistSurvey', userController.getResponse);

userRouter.get('/backoffice',admincontroller.UserTable);
userRouter.post('/retreat-application',userController.surveyResponse);
userRouter.post('/updateUser',userController.updateUser);
userRouter.post('/checkuser',verifyAuth,userController.checkUser);

export default userRouter;