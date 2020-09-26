import { Response, Request } from "express"
import User from "../models/userModel"
import { IUser } from "../types/user"
import { Attribute, Framework, ProgrammingLanguage, Skill } from "../types/attributes";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username}, { password: 0 });
    if (user == null) {
      res.status(401).json({ error: "Unable to find user"});
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    
    const newUser: IUser = new User({
      username: data.username,
      password: data.password,
      name: data.name,
      age: data.age,
      region: data.region,
      currentEmployment: data.currentEmployment,
      pastEmployment: data.pastEmployment,
      education: data.education,
      industry: data.industry,
      skills: initializeAttributes(data.skills, Object.keys(Skill)),
      programmingLanguages: initializeAttributes(data.programmingLanguages, Object.keys(ProgrammingLanguage)),
      frameworks: initializeAttributes(data.frameworks, Object.keys(Framework)),
      projects: [],
      invitations: []
    });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(401).json(error);
  }
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): Attribute[] => {
    // Reduce getting error here...
    const acceptedAttributes: Attribute[] = [];
    attributes.forEach(skill => {
      if (validAttributes.includes(skill)) {
        acceptedAttributes.push({ name: skill, votes: 0});
      }
    });
  
    return acceptedAttributes;  
}