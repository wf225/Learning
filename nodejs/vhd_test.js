var fs = require('fs');
var util = require('util');
var diskpart = require('./diskpart_helper.js');

function create_vdisk_cmd(path, size) {
  fs.exists(path, function(exists) {
    var error;
    if (!exists) {
      var cmd = util.format('create vdisk file=%s maximum=%s type=fixed', path, size);
      console.log(cmd);

      diskpart.evaluate([ cmd ], function(error, output) {
        if (error) throw error;
        console.log("VHD created successfully." + output);
      });
    }
    else {
      throw new Error(path + " is existing");
    }
  });  
}



create_vdisk_cmd('D:\\VHDs\\acadci-004.vhd', 1000);