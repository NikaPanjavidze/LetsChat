import ChatModel from "../models/chat.model";
import { Message } from "../models/message.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/app-error";
import { CreateChatSchemaType } from "../validators/chat.validator";

export const createChatService = async (
  userId: string,
  body: CreateChatSchemaType,
) => {
  const { isGroup, participantId, participants, groupName } = body;
  let chat;
  let allParitcipantsIds: string[] = [];

  if (isGroup && participants?.length && groupName) {
    allParitcipantsIds = [userId, ...participants];
    chat = await ChatModel.create({
      participants: allParitcipantsIds,
      isGroup: true,
      groupName,
      createdBy: userId,
    });
  } else if (participantId) {
    const otherUser = await UserModel.findById(participantId);
    if (!otherUser) throw new NotFoundException("User not found");

    allParitcipantsIds = [userId, participantId];
    const existingChat = await ChatModel.findOne({
      participants: { $all: allParitcipantsIds, $size: 2 },
    }).populate("participants", "name avatar");

    if (existingChat) return existingChat;

    chat = await ChatModel.create({
      participants: allParitcipantsIds,
      isGroup: false,
      createdBy: userId,
    });
  }

  //implement  websocket

  return chat;
};

export const getUserChatsService = async (userId: string) => {
  const chats = await ChatModel.find({
    participants: {
      $in: [userId],
    },
  })
    .populate("participants", "name avatar")
    .populate({
      path: "lastMessage",
      populate: { path: "sender", select: "name avatar" },
    })
    .sort({ updateAt: -1 });

  return chats;
};

export const getSingleChatService = async (userId: string, chatId: string) => {
  console.log(chatId);
  const chat = await ChatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat) {
    throw new NotFoundException(
      "Chat not found or you are unauthorized to view this chat.",
    );
  }

  const messages = await Message.find({ chatId })
    .populate("sender", "name avatar")
    .populate({
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ createdAt: -1 });

  return { chat, messages };
};
