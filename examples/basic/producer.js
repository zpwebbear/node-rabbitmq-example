const amqp = require('amqplib');
const credentials = require('../../credentials');

const queue = 'database-queue';
const message = {
  '_id': '54759eb3c090d83494e2d804',
  'comment': 'Test comment to queue message'
};

(async () => {
    const connection = await amqp.connect(credentials);

    const channel = await connection.createChannel();

    channel.assertQueue(queue, {
        durable: true //  queue won't be lost
      });

    channel.sendToQueue(
      queue, 
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true // messages in queue won't be lost even if RabbitMQ restarts.
      }
      )
})()