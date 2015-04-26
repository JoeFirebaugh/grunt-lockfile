/*
 * grunt-lockfile
 *
 *
 * Copyright (c) 2015 Joseph Firebaugh
 * Licensed under the MIT license.
 */

'use strict';

var touch = require('touch');

module.exports = function (grunt) {

  grunt.registerTask('lockfile', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      lockFile: 'grunt.lock'
    });

    var lockFile = options.lockFile;

    global['lockFile'] = lockFile;

    if (grunt.file.exists(lockFile)) {
      //grunt is already running or the lock file hasn't been deleted
      //we return an error code of 0 so Webstorm doesn't display anything about the failed attempt
      grunt.fail.warn("grunt.lock exists, build may already be running...",0);
    }
    else {
      touch(lockFile);

      //lets override the fatal and warn handlers in grunt so that we can remove the lock file prior to grunt
      //closing due to a problem

      var defaultWarnHandler = grunt.fail.warn;
      var defaultFatalHandler = grunt.fail.fatal;

      var warn = function() {
        grunt.file.delete("grunt.lock");
        defaultWarnHandler.apply(grunt, Array.prototype.slice.call(arguments));
      };

      var fatal = function() {
        grunt.file.delete("grunt.lock");
        defaultFatalHandler.apply(grunt, Array.prototype.slice.call(arguments));
      };

      grunt.fail.warn = warn;
      grunt.fail.fatal = fatal;
    }
  });

  grunt.registerTask('removelock', function () {
    grunt.file.delete(global['lockFile']);
  });
};
