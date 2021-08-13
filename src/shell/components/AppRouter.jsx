import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import RedirectWithStatus from 'Shell/components/RedirectWithStatus';

import mainRoutes from 'Shell/routing/main-routes';
import redirects from 'Shell/routing/redirects';
import ErrorBoundary from './ErrorBoundary';

const propTypes = {
  isStartup: PropTypes.bool.isRequired,
  initialState: PropTypes.object
};

const defaultProps = {
  initialState: {}
};

const AppRouter = ({isStartup, initialState}) => {
  const componentProps = isStartup ? {initialState} : {};

  return (
    <Switch>
      <Route key="index" path="/index.html" component={null}/>
      {redirects.map(route => (
        <RedirectWithStatus key={route.from} from={route.from} to={route.to} status={route.status} />))
        .concat(mainRoutes.map(({path, exact, loadableComponent: Component}) => (
          <Route key={path ?? 'not-found'}
            path={path}
            exact={exact ?? false}>
            <ErrorBoundary>
              <Component {...componentProps}/>
            </ErrorBoundary>
          </Route>
        )))}
    </Switch>
  );
};

AppRouter.propTypes = propTypes;
AppRouter.defaultProps = defaultProps;

export default AppRouter;
