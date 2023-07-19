const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())

      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}"
  },
});
