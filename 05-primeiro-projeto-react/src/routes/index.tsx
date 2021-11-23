import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dahsboard';
import Repository from '../Pages/Repository';

const Routes: React.FC = function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repository" component={Repository} />
    </Switch>
  );
};

export default Routes;
