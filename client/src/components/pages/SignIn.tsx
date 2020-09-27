import React from "react";
import styled from "styled-components";
import { Button, Container, CssBaseline, TextField, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { authenticationManager } from "../../authenticationManager";

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-around;
  align-items: center;
  width: 400px;
`;

export const SignIn = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [successfulLogin, setSuccessfulLogin] = React.useState<boolean>(false);

  const attemptLogin = async () => {
    await authenticationManager.attemptLogIn(username, password);
    setSuccessfulLogin(authenticationManager.getIsLoggedIn());
  };

  if (successfulLogin) {
    return <Redirect to="/users" />
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <SignInContainer>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <TextField fullWidth variant="outlined" label="Username" name="username" autoFocus onChange={(e => setUsername(e.target.value))}/>
          <TextField fullWidth variant="outlined" label="Password" name="password" type="password" autoFocus onChange={(e => setPassword(e.target.value))}/>
          <Button fullWidth variant="contained" color="primary" type="submit" onClick={() => attemptLogin()}>Sign in</Button>
          <Link to="/register">Don't have an account? Register here.</Link>
        </SignInContainer>
      </Container>
    );
  }
}