import { IProject } from "../types/project";
import { model, Schema } from "mongoose";

export const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    users: { type: [String], required: true },
    invitees: { type: [String], required: true},
    skills: { type: [String], required: true },
    programmingLanguages: { type: [String], required: true },
    frameworks: { type: [String], required: true },
    startDate: { type: Date, required: true },
    isInProgress: { type: Boolean, required: true },
    completionDate: { type: Date, required: false }
  }
)

export default model<IProject>("Project", ProjectSchema);