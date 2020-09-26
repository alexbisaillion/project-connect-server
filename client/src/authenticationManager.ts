import { isLoggedIn, login } from "./api";

class AuthenticationManager {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  async init() {
    const result = await isLoggedIn();
    if (result.data.isLoggedIn) {
      this.isLoggedIn = true;
    }
  }

  async attemptLogIn(username: string, password: string) {
    const result = await login(username, password);
    if (result.data.success) {
      console.log("updating isLoggedIn");
      this.isLoggedIn = true;
      console.log("updating isLoggedIn");
    }
  }
}

export const authenticationManager = new AuthenticationManager();