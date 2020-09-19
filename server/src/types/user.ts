import { Document } from "mongoose"
import { Attribute } from "./attributes";

export interface IUser extends Document {
  username: string;
  name: string;
  region: string;
  age: number;
  currentPosition: string;
  currentCompany: string;
  education: string;
  industry: string;
  skills: Attribute[];
  programmingLanguages: Attribute[];
  frameworks: Attribute[];
}
