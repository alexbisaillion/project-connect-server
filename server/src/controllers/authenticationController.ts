import { Response, Request } from "express"
import User from "../models/userModel"

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.session) {
      res.status(401).json({ error: "Could not retrieve the session" });
      return;
    }

    if (req.session.isLoggedIn) {
      res.status(201).json({ success: true });
      return;
    }

    const data = req.body;
    const user = await User.findOne({ username: data.username, password: data.password });
    if (user === null) {
      req.session.isLoggedIn = false;
      res.status(401).json({ error: "Incorrect credentials" });
    } else {
      req.session.isLoggedIn = true;
      req.session.username = data.username;
      req.session.password = data.password;
      res.status(201).json({ success: true });
    }
  } catch (error) {
    res.status(401).json(error);
  } 
}