import { Response, Request } from "express"
import { getCompatibility } from "../algorithms/getCompatibility";
import Project from "../models/projectModel"
import User from "../models/userModel"
import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project"
import { ProjectScore, UserScore } from "../types/scores";
import { IUser } from "../types/user";
import { Operation } from "../types/notification";

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
    await user.update({ $push: { notifications: { sender: project.creator, operation: Operation.NewInvite, timestamp: new Date(), project: project.name } } });

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

    const creator = await User.findOne({ username: project.creator });
    if (!creator) {
      res.status(401).json({ error: "Could not notify creator" });
      return;
    }
    console.log(project.name);
    await creator.update({ $push: { notifications: { sender: user.username, operation: Operation.NewRequest, timestamp: new Date(), project: project.name } } });
  
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

    if (!project.invitees.includes(data.username) || !user.invitations.includes(data.name)) {
      res.status(401).json({ error: "Not invited to project" });
    }

    // Add the user to the project users and remove the user from the invitees 
    await project.update({ $push: { users: data.username }});
    await project.update({ $pull: { invitees: data.username }});

    // Add to the user's list of projects and remove from invitations
    await user.update({ $push: { projects: data.name }});
    await user.update({ $pull: { invitations: data.name }});

    const creator = await User.findOne({ username: project.creator });
    if (!creator) {
      res.status(401).json({ error: "Could not notify creator" });
      return;
    }
    await creator.update({ $push: { notifications: { sender: user.username, operation: Operation.AcceptedInvite, timestamp: new Date(), project: project.name } } });

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

export const acceptRequest = async (req: Request, res: Response): Promise<void> => {
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

    if (!project.requests.includes(data.username) || !user.requests.includes(data.name)) {
      res.status(401).json({ error: "User has not requested to join project" });
    }

    // Add the user to the project users and remove the user from the invitees 
    await project.update({ $push: { users: data.username }});
    await project.update({ $pull: { requests: data.username }});

    // Add to the user's list of projects and remove from invitations
    await user.update({ $push: { projects: data.name }});
    await user.update({ $pull: { requests: data.name }});
    await user.update({ $push: { notifications: { sender: project.creator, operation: Operation.AcceptedRequest, timestamp: new Date(), project: project.name } } });

    const updatedProject = await Project.findOne({ name: data.name });
    if (!updatedProject) {
      res.status(401).json({ error: "Unable to find updated project"});
    }
  
    res.status(201).json(updatedProject);  
  } catch (error) {
    res.status(401).json(error);
  }
}

export const rejectRequest = async (req: Request, res: Response): Promise<void> => {
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

    if (!project.requests.includes(data.username) || !user.requests.includes(data.name)) {
      res.status(401).json({ error: "User has not requested to join project" });
    }

    // Do not add the user to the project users, just remove the user from the requests 
    await project.update({ $pull: { requests: data.username }});

    // Do not add to the user's list of projects, just remove from the user's requests
    await user.update({ $pull: { requests: data.name }});
    await user.update({ $push: { notifications: { sender: project.creator, operation: Operation.RejectedRequest, timestamp: new Date(), project: project.name } } });

    const updatedProject = await Project.findOne({ name: data.name });
    if (!updatedProject) {
      res.status(401).json({ error: "Unable to find updated project"});
    }
  
    res.status(201).json(updatedProject);  
  } catch (error) {
    res.status(401).json(error);
  }
}

export const rejectInvite = async (req: Request, res: Response): Promise<void> => {
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

    if (!project.invitees.includes(data.username) || !user.invitations.includes(data.name)) {
      res.status(401).json({ error: "Not invited to project" });
    }

    // Do not add the user to the project users, just remove from the invitees 
    await project.update({ $pull: { invitees: data.username }});

    // Do not add the project to the user's projects, just remove the invite
    await user.update({ $pull: { invitations: data.name }});

    const creator = await User.findOne({ username: project.creator });
    if (!creator) {
      res.status(401).json({ error: "Could not notify creator" });
      return;
    }
    await creator.update({ $push: { notifications: { sender: user.username, operation: Operation.RejectedInvite, timestamp: new Date(), project: project.name } } });

    const updatedUser = await User.findOne({ username: data.username });
    if (!updatedUser) {
      res.status(401).json({ error: "Unable to find updated user"});
    }
  
    res.status(201).json(updatedUser);  
  } catch (error) {
    res.status(401).json(error);
  } 
}

export const getMostRecentProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ error: "Invalid user to match against" });
      return;
    }

    const allUsers: IUser[] = await User.find();
    let projects: IProject[] = await Project.find();
    projects = projects.filter(project => project.creator !== user.username);
    const mostRecentProjects = projects.sort((a, b) => a.startDate < b.startDate ? 1 : -1).slice(0, Math.min(10, projects.length));
    const recentProjectsWithScores = mostRecentProjects.reduce((projects, project) => {
      const score = getCompatibility(project, user, allUsers);
      projects.push({ project, score });
      return projects;
    }, [] as ProjectScore[]);
    res.status(200).json(recentProjectsWithScores);
  } catch (error) {
    res.status(401).json(error);
  }
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): string[] => {
  return attributes.filter(attribute => validAttributes.includes(attribute));
}