import { IProject } from "../types/project";
import { IUser } from "../types/user";
import Project from "../models/projectModel";
import { convertToTitle, getRandomAttributes, getRandomNum, shuffle } from "./helpers";
import { company, hacker, date } from "faker";

export const makeProject = (creator: IUser, allUsers: IUser[]) => {
  allUsers = shuffle(allUsers);

  const chosenSkills = getRandomAttributes(creator.skills.map(skill => skill.name)).map(att => att.name);
  const chosenProgrammingLanguages = getRandomAttributes(creator.programmingLanguages.map(pl => pl.name)).map(att => att.name);
  const chosenFrameworks = getRandomAttributes(creator.frameworks.map(framework => framework.name)).map(att => att.name);

  const isInProgress: boolean = Math.random() >= 0.5;
  const startDate: Date = isInProgress ? date.recent() : date.past();
  const completionDate: Date | undefined = isInProgress ? undefined : date.recent();

  // Pick some users that make sense
  const users: string[] = [creator.username];

  // Pick between 1 and 3 users that have a matching skill
  let numUsers = getRandomNum(1, 3);
  for (let i = 0; i< numUsers; i++) {
    const user = allUsers.find(randomUser => chosenSkills.filter(
      chosenSkill => randomUser.skills.map(
        userSkill => userSkill.name
      ).includes(chosenSkill)
    ).length > 0 && !users.includes(randomUser.username));
    if (user) {
      users.push(user.username);
    }
  }

  // Pick between 1 and 3 users that have a matching programming language
  numUsers = getRandomNum(1, 3);
  for (let i = 0; i < numUsers; i++) {
    const user = allUsers.find(randomUser => chosenProgrammingLanguages.filter(
      chosenProgrammingLanguage => randomUser.programmingLanguages.map(
        pl => pl.name
      ).includes(chosenProgrammingLanguage)
    ).length > 0 && !users.includes(randomUser.username));
    if (user) {
      users.push(user.username);
    }
  }

  // Pick between 1 and 3 users that have a matching framework
  numUsers = getRandomNum(1, 3);
  for (let i = 0; i < numUsers; i++) {
    const user = allUsers.find(randomUser => chosenFrameworks.filter(
      chosenFramework => randomUser.frameworks.map(
        framework => framework.name
      ).includes(chosenFramework)
    ).length > 0 && !users.includes(randomUser.username));
    if (user) {
      users.push(user.username);
    }
  }

  const testProject: IProject = new Project({
    name: convertToTitle(company.catchPhraseNoun() + " " + hacker.noun() + " " + hacker.ingverb()),
    creator: creator.username,
    users: users,
    invitees: [],
    skills: chosenSkills,
    programmingLanguages: chosenProgrammingLanguages,
    frameworks: chosenFrameworks,
    startDate: startDate,
    isInProgress: isInProgress,
    completionDate: completionDate,
    description: company.catchPhrase()
  });

  return testProject;
}
