// @ts-ignore
// @cypress/verify/module-type commonjs
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    //setupNodeEvents(on, config) {
      // implement node event listeners here
      // z.B., Screenshot bei Fehlern oder zusätzliche Plugins laden
    //},
    supportFile: "cypress/support/index.js",
    specPattern: "cypress/integration/**/*.spec.js",
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
