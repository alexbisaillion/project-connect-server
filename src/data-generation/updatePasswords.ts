import mongoose from "mongoose";
import { IUser } from "../types/user";
import User from "../models/userModel"

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iwq4h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    const users: IUser[] = await User.find({});
    for (const user of users) {
      await user.update({ $set: { password: user.username }});
      console.log(user);
    }
  })
  .catch(error => {
    throw error
  })
