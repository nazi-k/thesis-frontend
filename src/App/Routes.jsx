import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import ProjectsList from 'ProjectList';
import LoginForm from 'Project/Authentication/Login';
import Logout from 'Project/Authentication/Logout';
import RegistrationForm from 'Project/Authentication/Register';
import PageError from 'shared/components/PageError';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/project" />
      <Route path="/authenticate" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />
      <Route path="/logout" component={Logout} />
      <Route path="/project/:projectId" component={Project} />
      <Route path="/project" component={ProjectsList} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
