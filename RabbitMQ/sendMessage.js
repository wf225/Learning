var amqp = require('amqplib/callback_api');

// 连接上RabbitMQ服务器
amqp.connect('amqp://10.148.221.43:5672', function(err, conn) {  
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    // 声明队列，然后将队列中的消息持久化取消
    ch.assertQueue(q, {durable: false}); 
    // 将字符串存入Buffer中，并推入队列
    var msg = 'Hello World-004!';
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent " + msg);
  });
});
/**
$ node rabbit-producer.js
  [x] Sent 'Hello World!'
*/