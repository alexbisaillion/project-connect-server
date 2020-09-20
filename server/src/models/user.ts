import { IUser } from "./../types/user";
import { model, Schema } from "mongoose";

const AttributeSchema = new Schema({ name: String, votes: Number});

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    region: { type: String, required: true },
    age: { type: Number, required: false },
    currentPosition: { type: String, required: false },
    currentCompany: { type: String, required: false },
    education: { type: String, required: false},
    industry: { type: String, required: true },
    skills: { type: [AttributeSchema], required: true },
    programmingLanguages: { type: [AttributeSchema], required: true },
    frameworks: { type: [AttributeSchema], required: true },
  }
)

export default model<IUser>("User", UserSchema);