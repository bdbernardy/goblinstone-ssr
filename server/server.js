/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const {webHandler} = require('./handlers/web');
const {errorMiddleware} = require('./handlers/errors');

dotenv.config();
axios.defaults.baseURL = process.env.PRIVATE_API_URL;

const useFullServer = process.env.USE_FULL_SERVER === 'true';
const port = parseInt(process.env.PORT, 10);
const serverFolder = path.dirname(process.argv[1]);
const publicFolder = path.resolve(serverFolder, '..', 'public');

const app = express();

if (useFullServer) {
  const { createProxyMiddleware } = require('http-proxy-middleware');
  app.use(express.static(publicFolder, {index: false}));  
  app.use('/api', createProxyMiddleware({
    target: process.env.PRIVATE_API_URL,
    xfwd: true
  }));
}

app.use(webHandler(serverFolder, publicFolder));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`listening on ${port}`);

  if (process.send) {
    console.log('Browser Refresh Enabled');
    process.send({event: 'online', url: `http://localhost:${port}/`});
  }
});
