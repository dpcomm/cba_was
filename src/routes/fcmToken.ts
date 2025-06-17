import FcmController from "@controllers/fcmController";
import express from "express";

const fcmRouter = express.Router();
const fcmController = new FcmController();

fcmRouter.post('/regist', fcmController.registToken);
fcmRouter.post('/delete', fcmController.deleteToken);
fcmRouter.post('/refresh', fcmController.refreshToken);

export default fcmRouter;