import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Pages/Dahsboard';
import Repository from '../Pages/Repository';

const Routes: React.FC = function () {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
