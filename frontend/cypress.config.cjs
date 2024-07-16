const { defineConfig } = require('cypress');
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      // Include any other plugin code...
      
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
