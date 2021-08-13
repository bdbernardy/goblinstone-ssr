const clientConfig = require('./client/webpack.config.client');
const serverConfig = require('./server/webpack.config.server');

module.exports = [clientConfig, serverConfig];
