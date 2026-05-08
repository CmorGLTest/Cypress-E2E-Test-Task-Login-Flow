const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: "https://demo.allianz-parken.de/parking/login"
    },
  },
});
