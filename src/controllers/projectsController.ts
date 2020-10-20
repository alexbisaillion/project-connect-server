import { Response, Request } from "express"
import Project from "../models/projectModel"
import User from "../models/userModel"
import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project"

export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ name: req.params.name});
    if (project == null) {
      res.status(401).json({ error: "Unable to find project"});
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(401).json(error);
  } 
}

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

    const creator = await User.findOne({ username: data.creator });
    if (creator === null) {
      res.status(401).json({ error: "Invalid creator" });
      return;
    }

    const newProject: IProject = new Project({
      name: data.name,
      creator: data.creator,
      users: [data.creator],
      invitees: [],
      skills: initializeAttributes(data.skills, Object.values(Skill)),
      programmingLanguages: initializeAttributes(data.programmingLanguages, Object.values(ProgrammingLanguage)),
      frameworks: initializeAttributes(data.frameworks, Object.values(Framework)),
      startDate: new Date(),
      isInProgress: true,
      description: data.description
    });
    const savedProject = await newProject.save();
    
    await creator.update({ $push: { projects: data.name }});
  
    res.status(201).json({ success: true });  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const inviteToProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const project = await Project.findOne({ name: data.name });
    const user = await User.findOne({ username: data.username });

    if (project === null) {
      res.status(401).json({ error: "Invalid project" });
      return;
    }

    if (user === null) {
      res.status(401).json({ error: "Invalid user" });
      return;
    }

    await project.update({ $push: { invitees: data.username }});
    await user.update({ $push: { invitations: data.name } });
  
    res.status(201).json({ success: true });  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const registerInProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const project = await Project.findOne({ name: data.name });
    const user = await User.findOne({ username: data.username });

    if (project === null) {
      res.status(401).json({ error: "Invalid project" });
      return;
    }

    if (user === null) {
      res.status(401).json({ error: "Invalid user" });
      return;
    }

    if (!project.invitees.includes(data.username) || !user?.invitations.includes(data.name)) {
      res.status(401).json({ error: "Not invited to project" });
    }

    // Add the user to the project users and remove the user from the invitees 
    await project.update({ $push: { users: data.username }});
    await project.update({ $pull: { invitees: data.username }});

    // Add to the user's list of projects and remove from invitations
    await user.update({ $push: { projects: data.name }});
    await user.update({ $pull: { invitations: data.name }});
  
    res.status(201).json({ success: true });  
  } catch (error) {
    res.status(401).json(error);
  } 
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): string[] => {
  return attributes.filter(attribute => validAttributes.includes(attribute));
}