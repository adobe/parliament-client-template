const fs = require("fs")
const path = require("path")

const glob = require("fast-glob")

require("dotenv").config({
  path: `.env`,
})

/**
 * Callback that creates symlinks to files in a local directory.
 * This code runs after Gatsby bootstraps but before running init code.
 *
 * @param {object} _ Gatsby api object(this is not used in this plugin)
 * @param {object} pluginOptions Plugin options
 * @param {string} pluginOptions.contentDir The content directory for this project
 * @param {string} pluginOptions.localProjectDir The absolute path to a local doc project
 * @param {string} pluginOptions.patterns A comma separated string of glob patterns to
 * match against the local doc project
 */
exports.onPreInit = (_, pluginOptions) => {
  const { contentDir, localProjectDir, patterns } = pluginOptions

  const patternsArray = patterns.split(",")

  // Try to access the external content directory
  fs.access(contentDir, err => {
    // When this error occurs, the directory does not exist
    // and we can proceed with the linking step
    if (err && err.code === "ENOENT") {
      console.log(`Linking local directory: ${localProjectDir}`)
      console.log(`Using patterns: ${patterns}`)

      const globOptions = {
        cwd: localProjectDir,
        nodir: true,
      }

      const fileResults = glob.sync(patternsArray, globOptions)

      fileResults.forEach(file => {
        const fileInfo = path.parse(file)

        const fullLocalPath = path.join(localProjectDir, file)
        const contentDirectory = path.join(contentDir, fileInfo.dir)

        fs.mkdirSync(contentDirectory, { recursive: true })
        fs.symlinkSync(
          fullLocalPath,
          path.join(contentDirectory, fileInfo.base)
        )
      })
    } else {
      console.log(
        `External content directory already exists. Skipping linking step.`
      )
    }
  })
}
