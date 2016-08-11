var os = require("os");
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var fsPlus = require('fs-plus');
var async = require('async');
var child_process = require('child_process');

exports.getTempScriptPath = function() {
  var currentTime, tempDirectory;
  currentTime = new Date().getTime();
  tempDirectory = process.env.TEMP || process.env.TMPDIR;
  return path.join(tempDirectory, "_diskpart-" + currentTime);
};

exports.execute = function(command, callback) {
  var child =  child_process.exec(command, {maxBuffer: 1000000000}, function(error, stdout, stderr) {
    if (error != null) {
      return callback(error);
    }
    if (!_.isEmpty(stderr)) {
      return callback(new Error(stderr));
    }
    return callback(null, stdout);
  });

  child.stdout.on('data', function(data) {
    console.log(data);
  });

  child.stderr.on('data', function(data) {
    console.log('ERROR: ' + data);
    return callback(null, data);
  });

  child.on('close', function(code) {
    // console.log('closing code: ' + code);
    // return callback(null, code);
  });
};

exports.runScript = function(scriptPath, callback) {
  if (scriptPath == null) {
    throw new Error('Missing diskpart script path');
  }

  return async.waterfall([
    function(callback) {
      return fs.exists(scriptPath, function(exists) {
        var error;
        if (!exists) {
          error = new Error("Diskpart script does not exist: " + scriptPath);
          return callback(error);
        }
        return callback();
      });
    }, function(callback) {
      var error, isFile;
      isFile = fsPlus.isFileSync(scriptPath);
      if (!isFile) {
        error = new Error("Diskpart script is not a file: " + scriptPath);
        return callback(error);
      }
      return callback();
    }, function(callback) {
      return exports.execute("diskpart /s \"" + scriptPath + "\"", callback);
    }, function(output, callback) {
      return setTimeout(function() {
        return callback(null, output);
      }, 2000);
    }
  ], callback);
};

exports.evaluate = function(input, callback) {
  if (input == null) {
    throw new Error('Diskpart missing input');
  }
  if (!_.isArray(input)) {
    throw new Error('Diskpart input should be an array of commands');
  }

  var scriptFilePath = exports.getTempScriptPath();
  scriptFilePath = scriptFilePath.replaceAll("\\", "\\\\");

  return async.waterfall([
    function(callback) {
      return fs.writeFile(scriptFilePath, input.join('\n'), callback);
    }, function(callback) {
      return exports.runScript(scriptFilePath, callback);
    }, function(output, callback) {
      return fs.unlink(scriptFilePath, function(error) {
        if (error != null) {
          return callback(error);
        }
        return callback(null, output);
      });
    }
  ], callback);
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};