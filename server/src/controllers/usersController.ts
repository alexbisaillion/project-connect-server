import { Response, Request } from "express"
import User from "../models/userModel"
import { IUser } from "../types/user"
import { Attribute, Framework, ProgrammingLanguage, Skill } from "../types/attributes";

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
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

    res.status(201).json(savedUser);
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