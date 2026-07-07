import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { authStatusController } from "../controllers/auth.controller";
import { getUsersController } from "../controllers/user.controller";

const userRoutes = Router().get(
  "/all",
  passportAuthenticateJwt,
  getUsersController,
);

export default userRoutes;
