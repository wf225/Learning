var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    
    // 声明已经存在的队列
    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    // 监听队列上面的消息
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
/**
$ node rabbit-consumer.js
  [*] Waiting for messages in hello. To exit press CTRL+C
  [x] Received Hello World!
*/