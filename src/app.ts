import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user";

const app = express();

dotenv.config();

const port = 3000;

app.use(cors());

// app.get("/", (req, res) => {
//     console.log(process.cwd());
//     res.send("Hello World!");
// });

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});