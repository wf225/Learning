const fs = require('fs');
const child_process = require('child_process');
var os = require("os");

console.log('os.platform: ' + os.platform())

for(var i=0; i<3; i++) {
   var workerProcess = child_process.exec('node support.js '+i,
      function (error, stdout, stderr) {
         if (error) {
            console.log('Error stack: ' + error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
         }
         console.log('stdout: ' + stdout.toString('utf8'));
         console.log('stderr: ' + stderr.toString('utf8'));
      });

   workerProcess.on('exit', function (code) {
      console.log('process exited: '+code);
   });
}