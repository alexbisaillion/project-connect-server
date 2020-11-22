import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const AttributeSchema = new Schema({ name: String, votes: Number});
const EmploymentSchema = new Schema({ company: String, position: String});
const NotificationSchema = new Schema({
  sender: String,
  operation: String,
  timestamp: Date,
  project: String
});

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    name: { type: String, required: true },
    region: { type: String, required: true },
    age: { type: Number, required: false },
    currentEmployment: { type: EmploymentSchema, required: false },
    pastEmployment: { type: [EmploymentSchema], required: false},
    education: { type: String, required: false},
    industry: { type: String, required: true },
    skills: { type: [AttributeSchema], required: true },
    programmingLanguages: { type: [AttributeSchema], required: true },
    frameworks: { type: [AttributeSchema], required: true },
    projects: { type: [String], required: true },
    invitations: { type: [String], required: true },
    requests: { type: [String], required: true },
    bio: { type: String, required: false },
    notifications: { type: [NotificationSchema], required: true }
  }
)

export default model<IUser>("User", UserSchema);