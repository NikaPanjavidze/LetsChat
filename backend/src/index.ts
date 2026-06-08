import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Env } from "./config/env.config";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: Env.FRONTEND_ORIGIN, credentials: true }));

app.get("/health", async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Serveer is healthy",
    status: "OK",
  });
});

app.listen(Env.PORT, () => {
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
