import mongoose from "mongoose";
import { IUser } from "../types/user";
import User from "../models/userModel";
import Project from "../models/projectModel";
import { IProject } from "../types/project";
import { getCompatibility } from "../algorithms/getCompatibility";
import fs from "fs";

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iwq4h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const users: IUser[] = await User.find({});
    const projects: IProject[] = await Project.find({});
    const allScores: { [key: string]: number[] } = {};

    console.log(users.length);
    console.log(projects.length);
    let count = 0;
    for (const user of users) {
      count++;
      console.log(user.username + " " + count + "/" + users.length);
      const scores: number[] = [];
      for (const project of projects) {
        scores.push(getCompatibility(project, user, users));
      }
      allScores[user.username] = scores;
    }

    fs.writeFile("iteration2.json", JSON.stringify(allScores), (e) => {
      if (e) {
        console.log("Failed to save.");
      } else {
        console.log("Saved!");
      }
    });
  })
  .catch(error => {
    throw error
  })
