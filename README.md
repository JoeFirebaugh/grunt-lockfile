# grunt-lockfile

> Add a lockfile to your grunt build to keep multiple instance of the build from running at the same time.

## Why use a grunt-lockfile?
When using grunt builds in Webstorm with a file watcher tasks, it's a common problem that multiple file edits will create a storm of grunt builds.  These storms can cause Webstorm to thrash, forcing you to have to close the application and reopen.  This grunt plugin will stop multiple grunt executions from running, preventing resource startvation within Webstorm.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lockfile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lockfile');
```

## The "lockfile" task

### Overview
In your project's Gruntfile, add a section named `lockfile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lockfile: {
    options: {
      lockFile:'build/grunt.lock'
    }
  },
})
```

### Options

#### options.lockFile
Type: `String`
Default value: `grunt.lock`

File to use as a lock.

### Usage
```js
grunt.registerTask('default', ['lockfile', 'jslint', 'build', 'concat', 'removelock']);
```

You should call the lockfile task first so it checks/creates the lock file for the build.  Aftewards, you would perform all of your other build tasks and follow with the 'removelock' task to delete the lock file after the build completes.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Joseph Firebaugh. Licensed under the MIT license.
