const amqp = require('amqplib');
const credentials = require('../../credentials');

const exchange = 'test-exchange';
const queue = 'database-queue';
const message = {
  '_id': '54759eb3c090d83494e2d804',
  'comment': 'Test comment to queue message'
};

(async () => {
  const connection = await amqp.connect(credentials);

  const channel = await connection.createChannel();

  channel.assertExchange(exchange, 'fanout', {
    durable: true
  });

  [...new Array(10)].map((item, index) => {
    message['_id'] = index
    channel.publish(
      exchange,
      '',
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true // messages in queue won't be lost even if RabbitMQ restarts.
      }
    )
  })
})()