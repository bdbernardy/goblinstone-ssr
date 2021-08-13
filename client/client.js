import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {loadableReady} from '@loadable/component';

import App from 'Source/App';

const hasServerMarkup = window.__HAS_SERVER_MARKUP__ ?? false;
const initialState = window.__INITIAL_STATE__ ?? {};
// eslint-disable-next-line prefer-reflect
delete window.__INITIAL_STATE__;

loadableReady(() => {
  if (hasServerMarkup) {
    ReactDOM.hydrate(
      <HelmetProvider>
        <BrowserRouter>
          <App hasServerMarkup={hasServerMarkup} initialState={initialState} />
        </BrowserRouter>
      </HelmetProvider>,
      document.getElementById('root'));
  } else {
    ReactDOM.render(
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>,
      document.getElementById('root'));
  }
});
