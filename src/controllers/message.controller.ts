import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.util";
import { Message } from "../models/Message.model";

const messageController = {
  sendMessage: catchAsync(async (req: Request, res: Response) => {
    const { sender, receiver, message } = req.body;

    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();

    return res.status(201).json(newMessage);
  }),
  getMessages: catchAsync(async (req: Request, res: Response) => {
    const { sender, receiver } = req.query;

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  }),
};

export default messageController;
