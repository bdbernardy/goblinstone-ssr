import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateHome from './home/PrivateHome';

const PrivateAreaRouter = () => {
  return (
    <Switch>
      <Route path="/private">
        <PrivateHome />
      </Route>
    </Switch>
  );
};

export default PrivateAreaRouter;
