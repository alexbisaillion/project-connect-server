import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project";
import { IUser } from "../types/user";
import { getCosineSimilarity } from "./cosineSimilarity";

const oneHotEncode = (attributes: string[], availableAttributes: string[]) => {
  const binaryRepresentation: number[] = []
  for (const availableAttribute of availableAttributes) {
    binaryRepresentation.push(attributes.includes(availableAttribute) ? 1 : 0);
  }
  return binaryRepresentation;
}

// const processProjects = (users: IUser[], projects: IProject[]) => {
//   // This could be sped up if we assumed that all attributes were already defined in .json
//   const mostCommonEducation = new Map<string, string | undefined>();
//   const mostCommonRegion = new Map<string, string | undefined>();
//   const averageAge = new Map<string, number>();
//   for (const project of projects) {
//     const usersInProject = getFullUsers(project, users);
//     mostCommonEducation.set(project.name, getMostCommonAttribute(usersInProject.map(user => user.education)));
//     mostCommonRegion.set(project.name, getMostCommonAttribute(usersInProject.map(user => user.region)))
//     averageAge.set(project.name, getAverageAttribute(users.map(user => user.age)));
//   }

//   // Now that we have all of these fields, compute what is available
//   const availableEducations = [...mostCommonEducation.values()];
//   const availableRegions = [...mostCommonRegion.values()];

//   for (const project of projects) {
//     const usersInProject = getFullUsers(project, users);
//     mostCommonEducation.set(project.name, getMostCommonAttribute(usersInProject.map(user => user.education)));
//     mostCommonRegion.set(project.name, getMostCommonAttribute(usersInProject.map(user => user.region)))
//     averageAge.set(project.name, getAverageAttribute(users.map(user => user.age)));
//   }
// }

// Here we are comparing a user to a project, so we 
export const getUserToProjectScore = (project: IProject, user: IUser, allUsers: IUser[]): number => {
  const usersInProject = getFullUsers(project, allUsers);
  const userVector: number[] = [];
  const projectVector: number[] = [];

  // Alma matter
  // const mostCommonEducation = getMostCommonAttribute(usersInProject.map(user => user.education));
  if (usersInProject.map(user => user.education).includes(user.education)) {
    userVector.push(1);
    projectVector.push(1);
  } else {
    userVector.push(1);
    projectVector.push(0);
  }

  // Region
  // const mostCommonRegion = getMostCommonAttribute(usersInProject.map(user => user.region));
  if (usersInProject.map(user => user.region).includes(user.region)) {
    userVector.push(1);
    projectVector.push(1);
  } else {
    userVector.push(1);
    projectVector.push(0);
  }

  // Age
  const mostCommonAge = getAverageAttribute(usersInProject.map(user => user.age));
  userVector.push(1);
  projectVector.push(Math.min(mostCommonAge, user.age) / Math.max(mostCommonAge, user.age));

  // Skills - VERY important to use the same availableSkills list, since order needs to be maintained.
  const availableSkills = Object.values(Skill);
  userVector.push(...oneHotEncode(user.skills.map(skill => skill.name), availableSkills));
  projectVector.push(...oneHotEncode(project.skills, availableSkills));

  // Programming Languages
  const availableProgrammingLanguages = Object.values(ProgrammingLanguage);
  userVector.push(...oneHotEncode(user.programmingLanguages.map(pl => pl.name), availableProgrammingLanguages));
  projectVector.push(...oneHotEncode(project.programmingLanguages, availableProgrammingLanguages));

  // Frameworks
  const availableFrameworks = Object.values(Framework);
  userVector.push(...oneHotEncode(user.frameworks.map(framework => framework.name), availableFrameworks));
  projectVector.push(...oneHotEncode(project.frameworks, availableFrameworks));

  return getCosineSimilarity(userVector, projectVector);
}

const getFullUsers = (project: IProject, allUsers: IUser[]): IUser[] => allUsers.filter(user => project.users.includes(user.username));

const getMostCommonAttribute = (attributes: string[]) => attributes.sort(
  (a, b) => attributes.filter(v => v === a).length - attributes.filter(v => v === b).length
).pop();

const getAverageAttribute = (attributes: number[]) => attributes.reduce((a, b) => (a + b)) / attributes.length;

