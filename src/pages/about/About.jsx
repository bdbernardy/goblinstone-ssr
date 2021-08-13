import React from 'react';
import {Helmet} from 'react-helmet-async';

import {serverPage} from 'Shell/hoc/server-page';

const About = () => {
  return (
    <>
      <Helmet>
        <title>{process.env.BUILD_APP_NAME} - About</title>
      </Helmet>
      <div>This is About</div>
    </>
  );
};

export default serverPage(About);
