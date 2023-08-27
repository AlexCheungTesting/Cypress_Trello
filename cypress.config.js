const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  if (!fs.existsSync(pathToConfigFile)) {
    console.log("No custom configfile!");
    return {};
  }
  return fs.readJson(pathToConfigFile)
}

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  e2e: {
    setupNodeEvents(on, config) {

      on('file:preprocessor', cucumber())
      
      //custom configfile configuration
      const file = config.env.configFile || ''
      return getConfigurationByFile(file)

      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    urlHost: "https://api.trello.com"
  },
});
