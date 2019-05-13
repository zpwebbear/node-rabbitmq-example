const amqp = require('amqplib');
const credentials = require('../../credentials');

const exchange = 'test-exchange';

(async () => {
    const connection = await amqp.connect(credentials);

    const channel = await connection.createChannel();

    channel.prefetch(1); // This tells RabbitMQ not to give more than one message to a worker at a time

    channel.assertExchange(exchange, 'fanout', {
        durable: true
    });

    const q = await channel.assertQueue('', {
        exclusive: true
    });

    channel.bindQueue(q.queue, exchange, '');

    channel.consume(
        q.queue, // queue name
        (msg) => { // callback
            console.log(" [x] Received second consumer %s", msg.content.toString());
            /**
             * Do something with message.
             */
            channel.ack(msg)
        },
        { // options
            noAck: false
        });
})()