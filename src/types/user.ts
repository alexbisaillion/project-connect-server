import { Document } from "mongoose"
import { Attribute, Employment } from "./attributes";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  region: string;
  age: number;
  currentEmployment: Employment;
  pastEmployment: Employment[];
  education: string;
  industry: string;
  skills: Attribute[];
  programmingLanguages: Attribute[];
  frameworks: Attribute[];
  projects: string[];
  invitations: string[];
  bio: string;
}
