import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { authenticationManager } from './authenticationManager';
import { SignIn } from './components/pages/SignIn';
import { Users } from './components/Users'

export const App = () => {
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);

  useEffect(() => {
    async function initialize() {
      await authenticationManager.init();
      setIsInitialized(true);
    }
    initialize();
  });

  if (!isInitialized) {
    return <div>Loading</div>
  }
  return (
    <BrowserRouter>
      <Route path="/login" component={SignIn} />
      <Route path="/home" component={DummyHomePage} />
      <AuthenticatedRouter path="/users" component={Users} />
    </BrowserRouter>
  );
}

const DummyHomePage = () => {
  return <h1>Home</h1>;
}

type AuthenticatedRouterProps = {
  component: any;
  path: string;
}
export const AuthenticatedRouter = (props: AuthenticatedRouterProps) => {
  const { component: Component, path } = props;

  console.log(authenticationManager.getIsLoggedIn());

  return (
    <Route
      path={path}
      render={() =>
        authenticationManager.getIsLoggedIn() ? (
          <Component />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};