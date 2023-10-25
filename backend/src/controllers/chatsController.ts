import { Request, Response } from "express";
import User from "../models/User.js";

export const generateChatCompletion = async (res: Response, req: Request) => {
  const { message } = req.body;
  const user = await User.findById(res.locals.jwtData._id);
  if (!user) {
    res
      .status(401)
      .json({ message: "User not registered or token malfunctioned" });
  }
  //   get chat of the user
  // send all the
};
