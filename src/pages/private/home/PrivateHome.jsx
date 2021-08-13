import React from 'react';
import {Helmet} from 'react-helmet-async';

const PrivateHome = () => {
  return (
    <>
      <Helmet>
        <title>{process.env.BUILD_APP_NAME} - Private Area</title>
      </Helmet>
      <div>
        Private Home Area. This is an SPA that wasn't generated on the server.
      </div>
    </>
  );
};

export default PrivateHome;
