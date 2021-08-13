const serialize = require('serialize-javascript');
const url = require('url');
const path = require('path');
const fs = require('fs');
const {renderToString} = require('../utils/react-render');

const {ChunkExtractor} = require('@loadable/server');

const handleWeb = async (req, res, htmlTemplate, statsFile) => {
  const {getReactMarkup, getRouteData} = require('../../build/server-bundle');

  let useIndexPage = (process.env.USE_SSR === 'false' || req.url === '/index.html');
  let initialState = {};
  let status = null;

  if (!useIndexPage) {
    const search = url.parse(req.url).search;
    const routeData = await getRouteData(req.path, search); // This returns the NotFound component with 404 status when no route is found.

    useIndexPage = routeData.isSpa;
    initialState = routeData.initialState ?? {};
    status = routeData.status;
  }

  const extractor = new ChunkExtractor({statsFile});

  const helmetContext = {};
  const routerContext = {};
  const reactMarkup = getReactMarkup(req.url, useIndexPage, initialState, helmetContext, routerContext);

  const body = await renderToString(extractor.collectChunks(reactMarkup));

  // If the routerContext returns an url, the App detected a redirect
  if (routerContext.url) {
    res.writeHead(routerContext.status ?? 301, {
      Location: routerContext.url
    });
    res.end();
    return;
  }

  // Setting response headers
  if (status) {
    res.status(status);
  }
  res.type('html');

  // Creating template data
  const scripts = extractor.getScriptTags();
  const links = extractor.getLinkTags();
  const styles = extractor.getStyleTags();
  const head = helmetContext.helmet.title.toString() +
    helmetContext.helmet.meta.toString() +
    helmetContext.helmet.meta.toString();
  let serverData = `window.__INITIAL_STATE__ = ${serialize(initialState)};`;
  serverData += `window.__HAS_SERVER_MARKUP__ = ${!useIndexPage};`;
  const browserRefreshScript = process.env.BROWSER_REFRESH_URL ?
    `<script src="${process.env.BROWSER_REFRESH_URL}"></script>` : '';

  // Sending response
  res.end(htmlTemplate({
    head,
    body,
    browserRefreshScript,
    serverData,
    scripts,
    links,
    styles
  }));
};

const webHandler = (serverFolder, publicFolder) => {
  const statsFile = path.resolve(publicFolder, 'loadable-stats.json');
  const serverBundle = path.resolve(serverFolder, '..', 'build', 'server-bundle.js');

  if (fs.existsSync(statsFile) && fs.existsSync(serverBundle)) {
    const htmlTemplate = require('../../build/server-bundle').getHtmlTemplate();
    return async (req, res, next) => {
      handleWeb(req, res, htmlTemplate, statsFile)
        .catch(next);
    };
  } else {
    return async (req, res) => {
      const browserRefreshScript = process.env.BROWSER_REFRESH_URL ? 
        `<script src="${process.env.BROWSER_REFRESH_URL}"></script>` : '';
      res.end(browserRefreshScript);
    };
  }
};

module.exports.webHandler = webHandler;
