var fs = require("fs");
var util = require('util');
var JsonUtil = require('./JsonUtil');

exports.getDistributionByInstance = function (callback) {
  fs.readFile( __dirname + "/" + "acadci_production_us.json", 'utf8', function (err, data) {
    if (err) throw err;    
    var obj = JSON.parse(data);
    var deployCommands = obj.DeployCommands;
    var myMap = new Map();

    for(var item of deployCommands) {
      if(item.Instance.startsWith("mac-")) {
        var branches = exports.getBranches(item.Command);
        myMap.set(item.Instance, branches);
      }
    }

    // console.log( myMap );
    return callback(JsonUtil.mapToJson(myMap));
  });
};

exports.getDistributionByBranch = function (callback) {
  fs.readFile( __dirname + "/" + "acadci_production_us.json", 'utf8', function (err, data) {
    if (err) throw err;    
    var obj = JSON.parse(data);
    var deployCommands = obj.DeployCommands;
    var myMap = new Map();

    for(var item of deployCommands) {
      if(item.Instance.startsWith("mac-")) {
        var branches = exports.getBranches(item.Command);

        for(var branch of branches) {
          var instanceArray = myMap.get(branch);
          if(instanceArray == undefined) {
            myMap.set(branch, [item.Instance]);
          }
          else {
            if(!instanceArray.includes(item.Instance)) {
              instanceArray.push(item.Instance);
            }
          }          
        }       

      }
    }

    // console.log( myMap );
    return callback(JsonUtil.mapToJson(myMap));
  });
};

exports.getBranches = function(cmd) {
  var arr = cmd.split('\'');
  var obj = JSON.parse(arr[1]);
  var branches = obj.buildbot_slave.branches;
  return branches;
};