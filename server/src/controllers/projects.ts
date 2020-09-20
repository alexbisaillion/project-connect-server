import { Response, Request } from "express"
import Project from "../models/project"
import User from "../models/user"
import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project"

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users: IProject[] = await Project.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
}

export const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const newProject: IProject = new Project({
      name: data.name,
      users: [],
      skills: initializeAttributes(data.skills, Object.keys(Skill)),
      programmingLanguages: initializeAttributes(data.programmingLanguages, Object.keys(ProgrammingLanguage)),
      frameworks: initializeAttributes(data.frameworks, Object.keys(Framework)),
      startDate: new Date(),
      isInProgress: true
    });
    const savedProject = await newProject.save();
  
    res.status(201).json(savedProject);  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const registerInProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const matchingUser = await User.find({ username: data.username });

    if (matchingUser.length < 1) {
      res.status(401).json({ error: "Unknown username" });
    }

    await Project.updateOne({ name: data.name }, { $addToSet: { users: data.username } });
  
    res.status(201).json({ success: true });  
  } catch (error) {
    res.status(401).json(error);
  } 
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): string[] => {
  return attributes.filter(attribute => validAttributes.includes(attribute));
}