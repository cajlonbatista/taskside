import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Main from '../pages/Main/Main';

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Main}/>
  </Switch>
);

export default Routes;