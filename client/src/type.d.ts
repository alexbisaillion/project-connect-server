interface IUser {
  _id: string
  name: string
  address: string
  __v: number
}

interface IIsLoggedIn {
  isLoggedIn: boolean;
}

interface ILogin {
  success: boolean;
  message?: string;
}

type Employment = {
  position: string;
  company: string;
}

type SuccessResponse = {
  success: boolean;
}