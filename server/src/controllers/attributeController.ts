import { Response, Request } from "express"
import { Framework, ProgrammingLanguage, Skill } from "../types/attributes"

export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  res.status(201).json(Object.values(Skill));
}

export const getProgrammingLanguages = async (_req: Request, res: Response): Promise<void> => {
  res.status(201).json(Object.values(ProgrammingLanguage));
}

export const getFrameworks = async (_req: Request, res: Response): Promise<void> => {
  res.status(201).json(Object.values(Framework));
}