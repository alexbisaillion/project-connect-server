import { Framework, ProgrammingLanguage, Skill } from "../types/attributes";
import { IProject } from "../types/project";
import { IUser } from "../types/user";
import { getCosineSimilarity } from "./getCosineSimilarity";

export const getCompatibility = (project: IProject, user: IUser, allUsers: IUser[]): number => {
  const usersInProject = getFullUsers(project, allUsers);
  const userVector: number[] = [];
  const projectVector: number[] = [];

  // Education
  // Alternatively, just check if at least one user in the project has a matching alma matter:
  // usersInProject.map(user => user.education).includes(user.education)
  const mostCommonEducation = getMostCommonAttribute(usersInProject.map(user => user.education));
  if (mostCommonEducation === user.education) {
    userVector.push(1);
    projectVector.push(1);
  } else {
    userVector.push(1);
    projectVector.push(0);
  }

  // Region
  const mostCommonRegion = getMostCommonAttribute(usersInProject.map(user => user.region));
  // Alternatively, just check if at least one user in the project has a matching region:
  // usersInProject.map(user => user.region).includes(user.region)
  if (mostCommonRegion === user.region) {
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

  // Industry
  const mostCommonIndustry = getMostCommonAttribute(usersInProject.map(user => user.industry));
  if (mostCommonIndustry === user.industry) {
    userVector.push(1);
    projectVector.push(1);
  } else {
    userVector.push(1);
    projectVector.push(0);
  }

  // Current/past employment

  // User companies
  const userRepresentedCompanies: string[] = [];
  userRepresentedCompanies.push(user.currentEmployment.company);
  userRepresentedCompanies.push(...user.pastEmployment.map(employment => employment.company));

  // Project companies
  const allRepresentedCompanies: string[] = [];
  allRepresentedCompanies.push(...usersInProject.map(user => user.currentEmployment.company));
  allRepresentedCompanies.push(...flattenList<string>(usersInProject.map(user => user.pastEmployment.map(employment => employment.company))));

  // If the user and project users share at least 1 company, indicate a match
  if (userRepresentedCompanies.filter(company => allRepresentedCompanies.includes(company))) {
    userVector.push(1);
    projectVector.push(1);
  } else {
    userVector.push(1);
    projectVector.push(0);
  }

  // For skills, programming languages, and frameworks, it is very important to list the attributes in the same order.

  // Skills
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

const oneHotEncode = (attributes: string[], availableAttributes: string[]) => {
  const binaryRepresentation: number[] = []
  for (const availableAttribute of availableAttributes) {
    binaryRepresentation.push(attributes.includes(availableAttribute) ? 1 : 0);
  }
  return binaryRepresentation;
}

const flattenList = <T>(list: any[]): T[] => list.reduce((accumulator, value) => accumulator.concat(value), []);

const getFullUsers = (project: IProject, allUsers: IUser[]): IUser[] => allUsers.filter(user => project.users.includes(user.username));

const getMostCommonAttribute = (attributes: string[]) => attributes.sort(
  (a, b) => attributes.filter(v => v === a).length - attributes.filter(v => v === b).length
).pop();

const getAverageAttribute = (attributes: number[]) => attributes.reduce((a, b) => (a + b)) / attributes.length;

