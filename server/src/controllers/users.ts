import { Response, Request } from "express"
import User from "../models/user"
import { IUser } from "../types/user"

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    throw error;
  }
}

export const addUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const newUser: IUser = new User({
      name: "Ethan Hunt",
      address: "Worldwide"
    })

    await newUser.save();

    res.status(201).json(JSON.stringify(newUser));
  } catch (error) {
    throw error;
  }
}