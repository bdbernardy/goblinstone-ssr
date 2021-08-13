import templatePage from './template/index.html';
import Handlebars from 'handlebars';

import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

import App from 'Source/App';
import {getRouteData} from './routing';

const getHtmlTemplate = () => {
  return Handlebars.compile(templatePage);
};

const getReactMarkup = (url, useIndexPage, initialState, helmetContext, routerContext) =>{
  return (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={useIndexPage ? '/index.html' : url} context={routerContext}>
        <App hasServerMarkup initialState={initialState}/>
      </StaticRouter>
    </HelmetProvider>
  );
};

export {getHtmlTemplate, getReactMarkup, getRouteData};
