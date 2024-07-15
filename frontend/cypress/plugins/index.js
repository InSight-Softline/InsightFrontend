const browserify = require('@cypress/browserify-preprocessor');
const coverage = require('@cypress/code-coverage/task');
const { startDevServer } = require('@cypress/webpack-dev-server');
const webpackConfig = require('../../webpack.config');

module.exports = (on, config) => {
  on('file:preprocessor', browserify(config));
  coverage(on, config);
  on('dev-server:start', (options) =>
    startDevServer({ options, webpackConfig })
  );
  return config;
};
