const amqp = require('amqplib');
const credentials = require('../../credentials');

const queue = 'hello';

(async () => {
    const connection = await amqp.connect(credentials);

    const channel = await connection.createChannel();

    channel.prefetch(1); // This tells RabbitMQ not to give more than one message to a worker at a time

    channel.assertQueue(queue, {
        durable: false
      });
    
    channel.consume(
        queue, // queue name
        (msg) => { // callback
            console.log(" [x] Received %s", msg.content.toString());
            /**
             * Do something with message.
             */
            channel.ack(msg)
        }, 
        { // options
            noAck: false
        });
})()