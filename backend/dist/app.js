import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
configDotenv();
const app = express();
app.use(express.json());
// remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map