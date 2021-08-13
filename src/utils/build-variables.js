const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path');

module.exports.getBuildVariables = (environmentName, additionalBuildVariables) => {
  const defaultEnvironmentConfig = path.resolve(__dirname, '..', '..', './.env');
  const environmentConfig = defaultEnvironmentConfig + '.' + environmentName;

  const configuration = fs.existsSync(environmentConfig) ? environmentConfig : defaultEnvironmentConfig;
  dotenv.config({path: configuration});
  const allVariables = {...additionalBuildVariables, ...process.env};

  return Object.keys(allVariables).reduce((prev, next) => {
    if (next.startsWith('BUILD_')) {
      prev[`process.env.${next}`] = JSON.stringify(allVariables[next]);
    }
    return prev;
  }, {});
};
