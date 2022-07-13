import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { getTokenInStorage, decodeToken } from './services/api'

import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Exercises from './pages/Exercises'
import Exercise from './pages/Exercise'
import Login from './pages/Login'

import DefaultLayout from './templates/default'

const AdminRoutes = ({ component: Component, auth, ...attrs }) => {

  const token = getTokenInStorage();
  const permission = decodeToken(token).permission === auth;

  return token && permission ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  ) : (
    <Redirect to="/404" />
  )
}

const PrivateRoute = ({ component: Component, auth, ...attrs }) => {

  const {_id} = getTokenInStorage() || {_id: false};

  return _id ? (
    <Route
      {...attrs}
      render={(props) => (
        <DefaultLayout>
          <Component {...props} />
        </DefaultLayout>
      )}
    />
  ) : (
    <Redirect to="/404" />
  )
}

function AllRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/settings" exact component={Settings} />
      <PrivateRoute path="/exercises" exact component={Exercises} />
      <PrivateRoute path="/exercise/:id" exact component={Exercise} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default AllRoutes;