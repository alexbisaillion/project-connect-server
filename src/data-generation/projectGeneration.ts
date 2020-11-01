import { IProject } from "../types/project";
import { IUser } from "../types/user";
import Project from "../models/projectModel";
import { convertToTitle, getRandomAttributes, getRandomNum, shuffle } from "./helpers";
import { company, date, lorem } from "faker";
import { getUserToProjectScore } from "../algorithms/getCompatibility";
import { UserScore } from "../types/scores";

export const makeProject = (creator: IUser, allUsers: IUser[]) => {
  allUsers = shuffle(allUsers);

  const chosenSkills = getRandomAttributes(creator.skills.map(skill => skill.name)).map(att => att.name);
  const chosenProgrammingLanguages = getRandomAttributes(creator.programmingLanguages.map(pl => pl.name)).map(att => att.name);
  const chosenFrameworks = getRandomAttributes(creator.frameworks.map(framework => framework.name)).map(att => att.name);

  const isInProgress: boolean = Math.random() >= 0.5;
  const startDate: Date = isInProgress ? date.recent() : date.past();
  const completionDate: Date | undefined = isInProgress ? undefined : date.recent();

  // Initial project object
  const testProject: IProject = new Project({
    name: convertToTitle(company.catchPhrase()),
    creator: creator.username,
    users: [creator.username],
    invitees: [],
    skills: chosenSkills,
    programmingLanguages: chosenProgrammingLanguages,
    frameworks: chosenFrameworks,
    startDate: startDate,
    isInProgress: isInProgress,
    completionDate: completionDate,
    description: lorem.paragraph()
  });

  // Pick some users that have high compatibility
  const users: string[] = [creator.username];
  let scores: UserScore[] = [];
  for (const otherUser of allUsers) {
    if (otherUser.username !== creator.username) {
      scores.push({ user: otherUser.username, score: getUserToProjectScore(testProject, otherUser, allUsers)});
    }
  }

  scores = scores.sort((a, b) => b.score - a.score);

  // Pick between 1 and 3 users that have a matching skill
  let numUsers = getRandomNum(1, 3);
  for (let i = 0; i < numUsers; i++) {
    users.push(scores[i].user);
  }

  testProject.users = users;

  return testProject;
}
