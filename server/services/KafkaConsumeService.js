const kafka = require('kafka-node');
const config = require('../config/kafka');

module.exports = {
    consume: function (context) {
        try {
            const Consumer = kafka.Consumer;
            const client = new kafka.KafkaClient(config.kafka_server);
            let consumer = new Consumer(
                client,
                [{ topic: (context === "add_order") ? config.kafka_add_order_topic : (context === "add_menu") ? config.kafka_add_menu_topic : config.kafka_add_user_topic,
                    partition: 0 }],
                {
                    autoCommit: true,
                    fetchMaxWaitMs: 1000,
                    fetchMaxBytes: 1024 * 1024,
                    encoding: 'utf8',
                    fromOffset: false
                }
            );
            consumer.on('message', async function(message) {
                console.log('here');
                console.log(
                    'kafka-> ',
                    message.value
                );
            });
            consumer.on('error', function(err) {
                console.log('error', err);
            });
        }
        catch(e) {
            console.log(e);
        }
    }
};
