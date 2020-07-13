const global = require("./global")
const production = require("./production")
const development = require("./development")

const prodConfig = {
  ...global,
  ...production,
  plugins: [...global.plugins, ...production.plugins],
}

const devConfig = {
  ...global,
  ...development,
  plugins: [...global.plugins, ...development.plugins],
}

module.exports = {
  production: prodConfig,
  development: devConfig,
}
