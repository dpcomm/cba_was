import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "@routes/user";
import logger from "@utils/logger";
import redisClient from "@utils/redis";

dotenv.config();
const app = express();

redisClient.connect().catch(logger.error);
redisClient.on('connect', () => { logger.info("Redis connected on redis container") });
redisClient.on('error', (err: any) => { logger.error(`Redis client error`, err) });

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}));
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.listen(process.env.SERVER_PORT, () => {
	logger.info(`Server app listening on port ${process.env.SERVER_PORT}`);
});