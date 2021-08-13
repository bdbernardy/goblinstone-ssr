import React from 'react';
import {Helmet} from 'react-helmet-async';

import StatusCodeEnum from 'Shell/routing/StatusCodesEnum';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>{process.env.BUILD_APP_NAME}</title>
      </Helmet>
      <div>
        Oh no, the page doesn't exist!
      </div>
    </>
  );
};

NotFound.status = StatusCodeEnum.NotFound;

NotFound.getHead = () => {
  return (
    <Helmet>
      <title>{process.env.BUILD_APP_NAME}</title>
    </Helmet>
  );
};


export default NotFound;
