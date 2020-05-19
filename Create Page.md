Create Page.md

$ quasar -v
1.0.0

$ quasar create test
? Target directory exists. Continue? Yes
? Project name (internal usage for dev) test
? Project product name (must start with letter if building mobile apps) Quasar App
? Project description A Quasar Framework app
? Author qvtec <qvtec3@gmail.com>
? Pick your favorite CSS preprocessor: (can be changed later) Sass
? Pick a Quasar components & directives import strategy: (can be changed later) Auto import
? Check the features needed for your project: ESLint, Vuex, Axios
? Pick an ESLint preset: Standard
? Cordova/Capacitor id (disregard if not building mobile apps) org.cordova.quasar.app
? Should we run `npm install` for you after the project has been created? (recommended) NPM

$ cd test/
$ quasar dev
$ quasar build

$ quasar new layout DefaultLayout

$ quasar new page Login Signup