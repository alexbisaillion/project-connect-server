export type Attribute = {
  name: string;
  votes: number;
}

export type Employment = {
  company: string;
  position: string;
}

export enum Skill {
  ObjectOrientedDevelopment = "Object Oriented Development",
  WebDevelopment = "Web Development",
  OperatingSystems = "Operating Systems",
  MachineLearning = "Machine Learning",
  DataScience = "Data Science",
  Analytics = "Analytics",
  ArtificialIntelligence = "Artificial Intelligence",
  Management = "Management",
  Agile = "Agile"
};

export enum ProgrammingLanguage {
  TypeScript = "TypeScript",
  JavaScript = "JavaScript",
  C = "C",
  CPlusPlus = "C++",
  CSharp = "C#",
  Java = "Java",
  Python = "Python",
  Ruby = "Ruby",
  Go = "Go",
  Swift = "Swift",
  PHP = "PHP",
  Kotlin = "Kotlin",
  Perl = "Perl",
  Rust = "Rust",
  Scala = "Scala",
  MATLAB = "MATLAB"
}

export enum Framework {
  ReactJS = "React JS",
  ReactNative = "React Native",
  Angular = "Angular",
  NodeJS = "Node.js",
  Bootstrap = "Bootstrap",
  NativeScript = "NativeScript"
}

// export enum DatabaseProgram {
//   MongoDB = "MongoDB",
//   PostgreSQL = "PostgreSQL"
// }

// export type DatabaseProgramAttribute = {
//   name: DatabaseProgram;
//   votes: number;
// }