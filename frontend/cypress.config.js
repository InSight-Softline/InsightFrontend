// @ts-ignore
// @cypress/verify/module-type commonjs
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
