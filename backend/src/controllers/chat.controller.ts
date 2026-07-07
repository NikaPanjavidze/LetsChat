import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createChatService,
  getSingleChatService,
  getUserChatsService,
} from "../services/chat.services";
import { chatIdSchema, createChatSchema } from "../validators/chat.validator";

export const createChatController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const body = createChatSchema.parse(req.body);

  const chat = await createChatService(userId, body);

  return res.status(StatusCodes.CREATED).json({
    message: "Chat Created or retreived successfully",
    chat,
  });
};

export const getUserChatsController = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const chats = await getUserChatsService(userId);

  return res.status(StatusCodes.CREATED).json({
    message: "User chats retreived successfully",
    chats,
  });
};

export const getSingleChatController = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = chatIdSchema.parse(req.params);

  const { chat, messages } = await getSingleChatService(userId, id);

  return res.status(StatusCodes.CREATED).json({
    message: "User chats retreived successfully",
    chat,
    messages,
  });
};
