export type Attribute = {
  name: string;
  votes: string[];
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
  QualityAssurance = "Quality Assurance",
  MobileDevelopment = "Mobile Development",
  VideoGameDevelopment = "Video Game Development",
  Security = "Security",
  Algorithms = "Algorithms",
  Networking = "Networking",
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
}

export enum Framework {
  ReactJS = "React JS",
  ReactNative = "React Native",
  Angular = "Angular",
  NodeJS = "Node.js",
  Bootstrap = "Bootstrap",
  NativeScript = "NativeScript",
  JQuery = "jQuery",
  Firebase = "Firebase",
  MongoDB = "MongoDB",
  PostgreSQL = "PostgreSQL"
}
