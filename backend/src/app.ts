import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

configDotenv();
const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
