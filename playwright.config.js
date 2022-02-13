/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  retries: 1,
  workers: 3,
  use: {
    headless: true,
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000',
  },
}

module.exports = config
