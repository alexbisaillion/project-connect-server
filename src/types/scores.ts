import { IProject } from "./project"
import { IUser } from "./user"

export type ProjectScore = {
  project: IProject;
  score: number;
}

export type UserScore = {
  user: IUser;
  score: number;
}