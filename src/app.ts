import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "@routes/user";
import logger from "@utils/logger";
import redisClient from "@utils/redis";
import applicationRouter from "@routes/application";
import youtubeRouter from "@routes/youtube";
import prayRouter from "@routes/pray";
import dashboardRouter from "@routes/dashboard";

dotenv.config();
const app = express();

redisClient.connect().catch(logger.error);
redisClient.on('connect', () => { logger.info("Redis connected on redis container") });
redisClient.on('error', (err: any) => { logger.error(`Redis client error`, err) });

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/youtube", youtubeRouter);
app.use("/api/pray", prayRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(process.env.SERVER_PORT, () => {
	logger.info(`Server app listening on port ${process.env.SERVER_PORT}`);
});