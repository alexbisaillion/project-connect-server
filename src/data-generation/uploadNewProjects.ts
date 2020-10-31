import mongoose from "mongoose";
import { IUser } from "../types/user";
import { makeRandomUser } from "./userGeneration";
import User from "../models/userModel";
import { makeProject } from "./projectGeneration";
import { getRandomNum } from "./helpers";
import { IProject } from "../types/project";

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iwq4h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const users: IUser[] = await User.find({});
    const createdProjects: IProject[] = [];
    for (const user of users) {
      const numProjects = getRandomNum(0, 2); // Each user will have created between 0 and 2 projects
      for (let i = 0; i < numProjects; i++) {
        const project: IProject = makeProject(user, users);
        if (createdProjects.some(existingProject => existingProject.name === project.name)) {
          i--;
          continue; // Duplicate project name, so retry
        }
        createdProjects.push(project);
        for (const username of project.users) {
          const actualUser = await User.findOne({ username: username });
          if (!actualUser) {
            throw Error("Could not find a corresponding user with username " + username);
          }
          actualUser.projects.push(project.name);
          await actualUser.save();
        }
        await project.save();
        console.log("Saved project " + project.name + " created by " + user.username);
      }
    }
  })
  .catch(error => {
    throw error
  })
