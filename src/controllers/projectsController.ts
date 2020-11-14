import { Response, Request } from "express"
import { getCompatibility } from "../algorithms/getCompatibility";
import Project from "../models/projectModel"
import User from "../models/userModel"
import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project"
import { UserScore } from "../types/scores";
import { IUser } from "../types/user";

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
    const projects: IProject[] = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(401).json(error);
  }
}

export const getProjectsByNames = async (req: Request, res: Response): Promise<void> => {
  try {
    const names: string[] = req.body.names;
    const projects: IProject[] = await Project.find({ name: { $in: names }});
    res.status(200).json(projects);
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
      requests: [],
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

    if (project.invitees.includes(user.username) || user.invitations.includes(project.name)) {
      res.status(401).json({ error: "User has already been invited" });
      return;
    }

    if (project.users.includes(user.username) || user.projects.includes(project.name)) {
      res.status(401).json({ error: "User has already joined" });
      return;
    }

    if (project.requests.includes(user.username) || user.requests.includes(project.name)) {
      res.status(401).json({ error: "User has already requested to join" });
      return;
    }

    await project.update({ $push: { invitees: data.username }});
    await user.update({ $push: { invitations: data.name } });

    const updatedUser = await User.findOne({ username: data.username });
    if (!updatedUser) {
      res.status(401).json({ error: "Unable to find updated user"});
    }
  
    res.status(201).json(updatedUser);  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const requestToJoinProject = async (req: Request, res: Response): Promise<void> => {
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

    if (project.invitees.includes(user.username) || user.invitations.includes(project.name)) {
      res.status(401).json({ error: "User has already been invited" });
      return;
    }

    if (project.users.includes(user.username) || user.projects.includes(project.name)) {
      res.status(401).json({ error: "User has already joined" });
      return;
    }

    if (project.requests.includes(user.username) || user.requests.includes(project.name)) {
      res.status(401).json({ error: "User has already requested to join" });
      return;
    }

    await project.update({ $push: { requests: data.username }});
    await user.update({ $push: { requests: data.name } });
  
    const updatedProject = await Project.findOne({ name: data.name });
    if (!updatedProject) {
      res.status(401).json({ error: "Unable to find updated project"});
    }

    res.status(201).json(updatedProject);
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

    const updatedUser = await User.findOne({ username: data.username });
    if (!updatedUser) {
      res.status(401).json({ error: "Unable to find updated user"});
    }
  
    res.status(201).json(updatedUser);  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const getUserRecommendationsForProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject | null = await Project.findOne({ name: req.params.name });
    if (!project) {
      res.status(401).json({ error: "Unable to find project" });
      return;
    }
    if (!project.isInProgress) {
      res.status(401).json({ error: "Cannot recommend users for a completed project" });
      return;
    }

    const allUsers: IUser[] = await User.find();
    const scores: UserScore[] = [];

    for (const user of allUsers) {
      if (user.projects.includes(project.name)) {
        continue;
      }
      scores.push({ user, score: getCompatibility(project, user, allUsers)});
    }

    res.status(200).json(scores.sort((a, b) => b.score - a.score));
  } catch (error) {
    res.status(401).json(error);
  }
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): string[] => {
  return attributes.filter(attribute => validAttributes.includes(attribute));
}