import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import {useHistory} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

import {serverPage} from 'Shell/hoc/server-page';

const propTypes = {
  article: PropTypes.object
};

const defaultProps = {
  article: {
    title: '',
    content: ''
  }
};

const Article = ({article}) => {
  const history = useHistory();
  const articleNode = useRef();
  const pageTitle = `${process.env.BUILD_APP_NAME} - ${article.title}`;

  const onAnchorClick = (e) => {
    const href = e.target.getAttribute('href');
    if (href) {
      console.log('onNavigate');
      e.preventDefault();
      history.push(e.target.getAttribute('href'));
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div ref={articleNode}>
        <h3>{article.title}</h3>
        <p onClick={onAnchorClick} dangerouslySetInnerHTML={{__html: article.content}} />
      </div>
    </>
  );
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

Article.getInitialState = async (/*routeParameters, queryParameters*/) => {
  return {
    isInteractive: false,
    article: []
  };
};

export default serverPage(Article);
