import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUsersService } from "../services/user.service";

export const getUsersController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const users = await getUsersService(userId);

  return res.status(StatusCodes.OK).json({
    message: " Users retrieved",
    users,
  });
};
