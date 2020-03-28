const kafka = require('kafka-node');
const config = require('../config/kafka');

module.exports = {
    produce: function (args) {
        try {

            const Producer = kafka.Producer;
            const client = new kafka.KafkaClient(config.kafka_server);
            const producer = new Producer(client);
            console.log('args', args);

            let payloads = [
                {
                    topic: config.kafka_topic,
                    messages: config.kafka_message + "with name: " + args.name
                }
            ];

            producer.on('ready', async function() {
                let push_status = producer.send(payloads, (err, data) => {
                    if (err) {
                        console.log('[kafka-producer -> '+config.kafka_topic+']: broker update failed');
                    } else {
                        console.log('[kafka-producer -> '+config.kafka_topic+']: broker update success');
                    }
                });
            });

            producer.on('error', function(err) {
                console.log(err);
                console.log('[kafka-producer -> '+config.kafka_topic+']: connection errored');
                throw err;
            });
        }
        catch(e) {
            console.log(e);
        }
    }
};
