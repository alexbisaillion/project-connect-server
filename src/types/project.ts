import { Document } from "mongoose"

export interface IProject extends Document {
  name: string;
  creator: string;
  users: string[];
  invitees: string[];
  requests: string[];
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  startDate: Date;
  isInProgress: boolean;
  completionDate?: Date;
  description: string;
}
