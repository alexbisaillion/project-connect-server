import { Response, Request } from "express"
import User from "../models/userModel"
import { IUser } from "../types/user"
import { Attribute, Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { getCompatibility } from "../algorithms/getCompatibility";
import Project from "../models/projectModel";
import { IProject } from "../types/project";
import { ProjectScore } from "../types/scores";

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

export const getUsersByUsernames = async (req: Request, res: Response): Promise<void> => {
  try {
    const usernames: string[] = req.body.usernames;
    const users: IUser[] = await User.find({ username: { $in: usernames }}, { password: 0 });
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
      skills: initializeAttributes(data.skills, Object.values(Skill)),
      programmingLanguages: initializeAttributes(data.programmingLanguages, Object.values(ProgrammingLanguage)),
      frameworks: initializeAttributes(data.frameworks, Object.values(Framework)),
      projects: [],
      invitations: [],
      requests: [],
      bio: data.bio,
      notifications: []
    });
    await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(401).json(error);
  }
}

export const getProjectRecommendationsForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findOne({ username: req.params.username });
    if (!user) {
      res.status(401).json({ error: "Unable to find user" });
      return;
    }
    const allUsers: IUser[] = await User.find();
    const allProjects: IProject[] = await Project.find();

    const scores: ProjectScore[] = [];
    for (const project of allProjects) {
      if (user.projects.includes(project.name) || !project.isInProgress) {
        continue;
      }
      scores.push({ project: project, score: getCompatibility(project, user, allUsers)});
    }

    res.status(200).json(scores.sort((a, b) => b.score - a.score));
  } catch (error) {
    res.status(401).json(error);
  }
}

export const dismissNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const user: IUser | null = await User.findOne({ username: data.username });
    if (!user) {
      res.status(401).json({ error: "Unable to find user" });
      return;
    }

    await user.update({ $set: { notifications: { "_id": data.notificationId } }});

    const updatedUser = await User.findOne({ username: data.username });
    if (!updatedUser) {
      res.status(401).json({ error: "Unable to find updated user"});
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json(error);
  }
}

export const voteForSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const targetUsername = data.targetUsername;
    const votingUsername = data.votingUsername;

    if (targetUsername === votingUsername) {
      res.status(401).json({ error: "Cannot vote for your own skill" });
    }

    const skill = data.skill;
    const targetUser: IUser | null = await User.findOne({ username: targetUsername });
    if (!targetUser) {
      res.status(401).json({ error: "Unable to find target user" });
      return;
    }
    const votingUser: IUser | null = await User.findOne({ username: votingUsername });
    if (!votingUser) {
      res.status(401).json({ error: "Voting user does not exist" });
      return;
    }

    let updatedSkillList: Attribute[] = [];
    if (Object.values(Skill).includes(skill)) {
      const existingSkill = targetUser.skills.find(listedSkill => listedSkill.name === skill);

      if (!existingSkill) {
        res.status(401).json({ error: "Specified user has not listed indicated interest" });
        return;
      }
      if (existingSkill.votes.includes(votingUsername)) {
        res.status(401).json({ error: "Vote has already been given" });
        return;
      }

      existingSkill.votes.push(votingUsername);

      updatedSkillList = [...targetUser.skills];
      const skillIndex = updatedSkillList.indexOf(existingSkill);
      updatedSkillList[skillIndex] = existingSkill;

      await targetUser.update({ $set: { skills: updatedSkillList }});
    } else if (Object.values(ProgrammingLanguage).includes(skill)) {
      const existingSkill = targetUser.programmingLanguages.find(listedSkill => listedSkill.name === skill);

      if (!existingSkill) {
        res.status(401).json({ error: "Specified user has not listed indicated programming language" });
        return;
      }
      if (existingSkill.votes.includes(votingUsername)) {
        res.status(401).json({ error: "Vote has already been given" });
        return;
      }

      existingSkill.votes.push(votingUsername);

      updatedSkillList = [...targetUser.programmingLanguages];
      const skillIndex = updatedSkillList.indexOf(existingSkill);
      updatedSkillList[skillIndex] = existingSkill;

      await targetUser.update({ $set: { programmingLanguages: updatedSkillList }});
    } else if (Object.values(Framework).includes(skill)) {
      const existingSkill = targetUser.frameworks.find(listedSkill => listedSkill.name === skill);

      if (!existingSkill) {
        res.status(401).json({ error: "Specified user has not listed indicated framework" });
        return;
      }
      if (existingSkill.votes.includes(votingUsername)) {
        res.status(401).json({ error: "Vote has already been given" });
        return;
      }

      existingSkill.votes.push(votingUsername);

      updatedSkillList = [...targetUser.frameworks];
      const skillIndex = updatedSkillList.indexOf(existingSkill);
      updatedSkillList[skillIndex] = existingSkill;

      await targetUser.update({ $set: { frameworks: updatedSkillList }});
    } else {
      res.status(401).json({ error: "Invalid skill" });
      return;
    }

    const updatedUser = await User.findOne({ username: targetUsername });
    if (!updatedUser) {
      res.status(401).json({ error: "Unable to find updated user"});
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json(error);
  }
}

const initializeAttributes = (attributes: string[], validAttributes: string[]): Attribute[] => {
    // Reduce getting error here...
    const acceptedAttributes: Attribute[] = [];
    attributes.forEach(skill => {
      if (validAttributes.includes(skill)) {
        acceptedAttributes.push({ name: skill, votes: []});
      }
    });
  
    return acceptedAttributes;  
}