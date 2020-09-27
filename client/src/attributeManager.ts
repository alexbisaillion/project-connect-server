import { getFrameworks, getProgrammingLanguages, getSkills } from "./api";

class AttributeManager {
  private skills: string[];
  private programmingLanguages: string[];
  private frameworks: string[];

  constructor() {
    this.skills = [];
    this.programmingLanguages = [];
    this.frameworks = [];
  }

  async init() {
    const skills = await getSkills();
    this.skills = skills.data;
    const programmingLanguages = await getProgrammingLanguages();
    this.programmingLanguages = programmingLanguages.data;
    const frameworks = await getFrameworks();
    this.frameworks = frameworks.data;
  }

  getSkills() {
    return this.skills;
  }

  getProgrammingLanguages() {
    return this.programmingLanguages;
  }

  getFrameworks() {
    return this.frameworks;
  }
}

export const attributeManager = new AttributeManager();