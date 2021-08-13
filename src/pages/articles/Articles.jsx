import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import {serverPage} from 'Shell/hoc/server-page';

const propTypes = {
  articles: PropTypes.array
};

const defaultProps = {
  articles: []
};

const Articles = ({articles}) => {
  const [state] = useState({articles});

  return (
    <>
      <Helmet>
        <title>{process.env.BUILD_APP_NAME} - Articles</title>
      </Helmet>
      <div>
        <h3>Articles</h3>
        <div>
          {state.articles.map(item => (
            <div key={item.id}><Link to={`/articles/${item.id}`}>{item.title}</Link></div>
          ))}
        </div>
      </div>
    </>
  );
};

Articles.propTypes = propTypes;
Articles.defaultProps = defaultProps;

Articles.getInitialState = async (/*routeParameters, queryParameters*/) => {
  return {articles: []};
};

export default serverPage(Articles);
