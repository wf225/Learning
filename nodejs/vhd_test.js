var fs = require('fs');
var util = require('util');
var diskpart = require('./diskpart_helper.js');

//类的定义
class Animal {
	//ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
}
//类的继承
class Programmer extends Animal {
    constructor(name) {
    	//直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
}
//测试我们的类
var animal=new Animal('dummy'),
wayou=new Programmer('wayou');
animal.sayName();//输出 ‘My name is dummy’
wayou.sayName();//输出 ‘My name is wayou’
wayou.program();//输出 ‘I'm coding...’



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

// create_vdisk_cmd('D:\\VHDs\\acadci-004.vhd', 1000);