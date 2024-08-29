const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ceh-admin.trisma.io.vn/', // or your app's base URL
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/integration/**/*.spec.js',
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    videoUploadOnPasses: false,
  },
});
