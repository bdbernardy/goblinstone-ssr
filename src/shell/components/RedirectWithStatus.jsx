import React from 'react';
import PropTypes from 'prop-types';

import {Redirect, Route} from 'react-router-dom';

const propTypes = {
  from: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  status: PropTypes.number
};

const RedirectWithStatus = ({from, to, status}) => {
  return (
    <Route path={from}
      render={({staticContext, match, location}) => {
        let redirectTo = (typeof to === 'function') ? to(match.params) : to;
        redirectTo += location.search;

        if (staticContext) staticContext.status = status;
        return <Redirect to={redirectTo} />;
      }}
    />
  );
};

RedirectWithStatus.propTypes = propTypes;

export default RedirectWithStatus;
