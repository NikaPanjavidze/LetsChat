import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Env } from "./config/env.config";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import connectDatabase from "./config/database.config";

import "./config/passport.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: Env.FRONTEND_ORIGIN, credentials: true }));

app.use(passport.initialize());

app.get("/health", async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Serveer is healthy",
    status: "OK",
  });
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
