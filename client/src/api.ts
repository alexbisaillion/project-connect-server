import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  try {
    const users: AxiosResponse<IUser[]> = await axios.get(baseUrl + "/users");
    return users;
  } catch (error) {
    throw new Error(error)
  }
}
