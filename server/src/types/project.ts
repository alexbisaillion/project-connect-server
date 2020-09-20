import { Document } from "mongoose"

export interface IProject extends Document {
  name: string;
  users: string[];
  invitees: string[];
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  startDate: Date;
  isInProgress: boolean;
  completionDate?: Date;
}
