import axios, { AxiosResponse } from "axios"
axios.defaults.withCredentials = true;

const baseUrl: string = "http://localhost:4000"

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  try {
    const users: AxiosResponse<IUser[]> = await axios.get(baseUrl + "/users");
    return users;
  } catch (error) {
    throw new Error(error);
  }
}

export const isLoggedIn = async (): Promise<AxiosResponse<IIsLoggedIn>> => {
  try {
    const isLoggedIn: AxiosResponse<IIsLoggedIn> = await axios.get(baseUrl + "/isLoggedIn");
    return isLoggedIn;
  } catch (error) {
    throw new Error(error);
  }
}

export const login = async (username: string, password: string): Promise<AxiosResponse<ILogin>> => {
  try {
    const res: AxiosResponse<ILogin> = await axios.post(baseUrl + "/login", { username, password });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}

export const getSkills = async (): Promise<AxiosResponse<string[]>> => {
  try {
    const skills: AxiosResponse<string[]> = await axios.get(baseUrl + "/skills");
    return skills;
  } catch (error) {
    throw new Error(error);
  }
}

export const getProgrammingLanguages = async (): Promise<AxiosResponse<string[]>> => {
  try {
    const programmingLanguages: AxiosResponse<string[]> = await axios.get(baseUrl + "/programmingLanguages");
    return programmingLanguages;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFrameworks = async (): Promise<AxiosResponse<string[]>> => {
  try {
    const frameworks: AxiosResponse<string[]> = await axios.get(baseUrl + "/frameworks");
    return frameworks;
  } catch (error) {
    throw new Error(error);
  }
}

export type RegistrationInfo = {
  username: string;
  password: string;
  name: string;
  age: number;
  region: string;
  education: string;
  industry: string;
  currentEmployment: Employment;
  pastEmployment: Employment[];
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
};
export const register = async (info: RegistrationInfo): Promise<AxiosResponse<SuccessResponse>> => {
  try {
    const result: AxiosResponse<SuccessResponse> = await axios.post(baseUrl + "/addUser", info);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}