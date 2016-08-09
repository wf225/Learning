var fs = require('fs');
var util = require('util');
var diskpart = require('./diskpart_util.js');

class VHDCommand {
  constructor(args) {
    this.args = args;
    this.path = args.path;
    this.dry_run = false;
    this.verbose = true;
  }

  can_run(callback) {
    return callback(true, null);
  }

  run() {
    // var [res, err] = this.can_run();
    var _this = this;
    this.can_run(function(res, err) {
      if (res) {
        _this.do_run();
      } else {
        console.log(err);
        return;
      }
    });    
  }

  do_run() {
    var cmd = this.cmd_template();
    console.log(cmd);

    diskpart.evaluate([ cmd ], function(error, output) {
      if (error) throw error;
      console.log(output);
    });
  }

  cmd_template() {
    // Implement in subclass.
  }

  is_mounted(callback) {
    var path = this.path.replaceAll("\\", "\\\\");
    diskpart.evaluate([ "list vdisk" ], function(error, output) {
      var regex = new RegExp(`^.*Attached.*${path}$`);

      output = output.replaceAll('\r\n', ';');
      // console.log(output);
      var outputArr = output.split(';');
      for(var i = 8; i < outputArr.length; i++) {
        var item = outputArr[i];
        var findIndex = item.search(regex);
        console.log(i + item);
        console.log(findIndex);
        
        if(findIndex > -1) {
          return callback(true);
        }
      }
      
      // var findIndex = output.search(regex);
      // console.log(findIndex);
      return callback(false);
    });
  }

  vhd_exists() {
    return fs.existsSync(this.path);
  }
}

class VHDCreateCommand extends VHDCommand {
  constructor(args) {
    super(args);
    this.size = args.size;
    this.parent = args.parent;
    this.label = args.label;
    this.mount_point = args.mount_point;
  }

  cmd_template() {
    return this.create_vdisk_cmd() +
`
select vdisk file="${this.path}"
attach vdisk
convert mbr
create partition primary
format fs=ntfs label="${this.label}" quick
assign mount="${this.mount_point}"
exit
`;
  }

  create_vdisk_cmd() {
    if (this.parent == null) {
      return `create vdisk file="${this.path}" maximum=${this.size} type=fixed`
    } else {
      return `create vdisk file="${this.path}" maximum=${this.size} parent=${this.parent} type=fixed`
    }
  }

  can_run(callback) {
    if (this.vhd_exists()) {
      return callback(false, `ERROR: VHD file already exists ${this.path}.`);
    }
    else if (this.parent !=null && (!this.parent_vhd_exists())) {
      return callback(false, `ERROR: parent VHD file doesn't exist ${this.parent}.`);
    }       
    else {
      return callback(true, null);
    }      
  }

  parent_vhd_exists() {
    return fs.existsSync(this.parent);
  }
}

class VHDMountCommand extends VHDCommand {
  constructor(args) {
    super(args);
    this.mount_point = args.mount_point;
  }

  cmd_template() {
    return `
select vdisk file="${this.path}"
attach vdisk noerr
select partition=1
assign mount="${this.mount_point}"
exit
`;
  }

  can_run(callback) {
    if (!this.vhd_exists()) {
      return callback(false, `ERROR: VHD file not found at ${this.path}.`);
    }
    else if(!this.mount_point_ok()) {
      return callback(false, 'ERROR: Invalid mount point. It maybe not exist or it is not an empty directory.');
    }    
    else {
      this.is_mounted(function(is_mounted) {
        if(is_mounted) {
          return callback(false, 'ERROR: VHD file already mounted.');
        } else {
          return callback(true, null);
        }
      });
    }
  }

  mount_point_ok() {
    return fs.existsSync(this.mount_point);
    //return os.path.exists(mount_point) and (not Win32Utils().is_junction(mount_point)) and (os.path.isdir(mount_point) and os.listdir(mount_point) == [])
  }
}

class VHDUnmountCommand extends VHDCommand {
  constructor(args) {
    super(args);
    this.mount_point = args.mount_point;
  }

  cmd_template() {
    return `
select vdisk file="${this.path}"
select partition=1
remove mount="${this.mount_point}"
detach vdisk
exit
`;
  }

  can_run(callback) {
    if (!this.vhd_exists()) {
      return callback(false, `ERROR: VHD file not found at ${this.path}.`);
    }   
    else {
      this.is_mounted(function(is_mounted) {
        if(!is_mounted) {
          return callback(false, 'ERROR: VHD file already unmounted.');
        } else {
          return callback(true, null);
        }
      });
    }      
  }
}

// Test Create
var create_args = {
  path: "D:\\VHDs\\O_Branches_B.vhd",
  size: 40000, 
  label: "O_Branches_B", 
  mount_point: "D:\\CI\\VHDs\\O_Branches-B", 
  parent: null
};

// var createCommand = new VHDCreateCommand(create_args);
// createCommand.run();

// Test Unmount
var unmount_args = {
  path: "\\\\shacng108wmzh\\VHDs\\O_Branches_B.vhd", 
  mount_point: "D:\\CI\\VHDs\\O_Branches-B"
};

// var mountCommand = new VHDMountCommand(create_args);
// mountCommand.run();

var unmountCommand = new VHDUnmountCommand(create_args);
unmountCommand.run();

var cmd = `python "D:\\CI/client_tools/citools/sync_source.py" "-mount-point" "D:\\CI/VHDs/O_Branches-B" "-changeset" "62370" "-branch" "$/AutoCAD/O-Branches/B" "-vhd-mode" "direct" "-diff-disk-path" "D:\\CI" "-tfs-username" "ads\\wubil" "-tfs-password" "feng@007" "-project" "Fabric" "-repo-url" "http://tfs.autodesk.com:8080/tfs/AcadCollection" "-tfs-itemspec" "components develop tools" "-tfs-cloak-file" "./ci_cloakFile.json" "-scm" "tfs" "-vhd-life-time" "180"`;

// var cmd2 = `python "D:\\CI/client_tools/citools/vhd_test.py"`;
// diskpart.execute(cmd, function(error, output) {
//   if (error) throw error;
//   console.log(output);
// });