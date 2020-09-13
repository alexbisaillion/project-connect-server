import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Users } from './components/Users'

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Users} />
    </BrowserRouter>
  );
}
