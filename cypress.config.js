import { defineConfig } from "cypress";


export default defineConfig({
  e2e: {
    env: {
      API_URL: "https://api.clickup.com/api/v2",
      TEAM_ID: "90151218231",
      TOKEN: "pk_200434380_RZKCSHSPV4593XTRTU5P7UCT2RRT3FVY",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
