export type Attribute = {
  name: string;
  votes: number;
}

export enum Skill {
  ObjectOrientedDevelopment = "ObjectOrientedDevelopment",
  WebDevelopment = "WebDevelopment",
  OperatingSystems = "OperatingSystems",
  MachineLearning = "MachineLearning",
  DataScience = "DataScience",
  Analytics = "Analytics",
  ArtificialIntelligence = "ArtificialIntelligence",
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
  ReactJS = "ReactJS",
  ReactNative = "ReactNative",
  Angular = "Angular",
  NodeJS = "NodeJS",
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