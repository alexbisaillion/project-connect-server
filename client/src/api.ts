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
    const res: AxiosResponse<ILogin> = await axios.post(baseUrl + "/login", { username, password }, { withCredentials: true });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
