# parliament-client-template

## 🚀 Quick start


1. **Clone your docs repo**

   ```sh
   git clone git@github.com:org/repo
   ```

1. **Clone this repo**

   ```sh
   git clone git@github.com:adobe/parliament-client-template.git
   cd parliament-client-template
   ```

1. **Install dependencies**

   ```sh
   yarn install
   ```

1. **Create an environment File**

   Create a `.env.development` and `.env.production` files and define environment variables as below. Refer: [https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

   For local:

   ```
   GATSBY_SITE_PATH_PREFIX =
   GATSBY_GIT_CORP_TOKEN = 1cdba7077XXXXXXXXXXXXXXXX633c1

   # Repo URL in given format which you want to use to generate a microsite
   # NOTE: for Enterprise instances, this MUST be the FULL HTTPS URL
   #       This repository must contain a manifest*.* file for Parliament to read.
   #       (preferably in a .yaml format)
   GATSBY_SOURCE = github.com/<source_org>/<source_repo>.git
   GATSBY_SOURCE_BRANCH=master

   # Strings starting with a "!" are considered ignore patterns. For example !CONTRIBUTING.md will tell the system to skip CONTRIBUTING.md
   GATSBY_SOURCE_PATTERNS=**/*,!CONTRIBUTING.md
   GATSBY_SOURCE_TITLE=My Docs Site

   # Url for your analytics script
   GATSBY_LAUNCH_SRC=//assets.adobedtm.com/<id>/launch-<id>.min.js
   # NOTE: this is an absolute path to a local copy of $GATSBY_SOURCE
   LOCAL_PROJECT_DIRECTORY=/absolute/path/to/docs/project
   SWAGGER_SOURCE_PATTERNS=**/petstore.json,**/swagger.json
   ```

   For Jenkins:

   ```
   GATSBY_GIT_CORP_TOKEN = credentials('TOKEN')
   # Repo URL in given format which you want to use to generate a microsite
   GATSBY_SOURCE = 'github.com/<source_org>/<source_repo>.git'
   # Repo URL in given format where you want to host the static html build output from Gatsby for Gihub Pages
   GATSBY_TARGET = 'github.com/<target_org>/<target_repo>.git'
   GATSBY_SITE_PATH_PREFIX = '/pages/<target_org>/<target_repo>' // Path Prefix for link relationship to work
   GATSBY_SOURCE_BRANCH=master
   # Strings starting with a "!" are considered ignore patterns. For example !CONTRIBUTING.md will tell the system to skip CONTRIBUTING.md
   GATSBY_SOURCE_PATTERNS=**/*,!CONTRIBUTING.md
   GATSBY_SOURCE_TITLE=My Docs Site
   # Url for your analytics script
   GATSBY_LAUNCH_SRC=//assets.adobedtm.com/<id>/launch-<id>.min.js
   LOCAL_PROJECT_DIRECTORY=/absolute/path/to/docs/project
   SWAGGER_SOURCE_PATTERNS=**/petstore.json,**/swagger.json
   ```

1. **Clean environment**

   If you have previously built a production site or switching to a new local project, run this command to remove the `.cache` directory.

   ```sh
   yarn run clean
   ```

1. **Start developing/authoring**

   Start a local instance of this project using the following command:

   ```sh
   yarn run develop
   ```

1. **Open the source code and start editing!**

   Your site is now running at `http://localhost:8000`!

   _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

   Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## ✅ Testing

### Development

1. **Run unit tests**

   ```sh
   yarn run test:integration
   ```

2. ** Run end to end tests**

   ```sh
   gatsby clean
   yarn run test:e2e
   ```

### Production

To simulate production tests first set the environment variable `GATSBY_SITE_PATH_PREFIX` locally as it is required for production tests to run properly.

1. **Run unit tests**

```sh
yarn run test:integration
```

2. ** Run end to end tests**

   ```sh
   gatsby clean
   yarn run build:prod
   yarn run test:e2e:ci
   ```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.
