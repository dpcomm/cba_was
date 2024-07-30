import express from "express";
import YoutubeController from "@controllers/youtubeController";
import verifyAuth from "@middlewares/verifyAuth";

const youtubeRouter = express.Router();
const youtubeController = new YoutubeController();

youtubeRouter.get('/', youtubeController.getYoutube);
youtubeRouter.post('/', youtubeController.createYoutube);

export default youtubeRouter;