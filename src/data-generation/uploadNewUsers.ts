import mongoose from "mongoose";
import { IUser } from "../types/user";
import { makeRandomUser } from "./userGeneration";

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iwq4h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    for (let i = 0; i < 1000; i++) {
      try {
        const newUser: IUser = makeRandomUser();
        await newUser.save();
        console.log("Saved user " + i);
      } catch (err) {
        i--; // try again
      }
    }
  })
  .catch(error => {
    throw error
  })
