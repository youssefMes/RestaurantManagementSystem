const kafka = require('kafka-node');
const config = require('../config/kafka');

module.exports = {
    produce: function (args, context) {
        try {

            const Producer = kafka.Producer;
            const client = new kafka.KafkaClient(config.kafka_server);
            const producer = new Producer(client);
            console.log('args', args);

            let payloads = [
                {
                    topic: (context === "add_order") ? config.kafka_add_order_topic : (context === "add_menu") ? config.kafka_add_menu_topic : config.kafka_add_user_topic,
                    messages: 'A new '+ context + " Event dispatched :" + JSON.stringify(args)
                }
            ];
            console.log(payloads);
            producer.on('ready', async function() {
                let push_status = producer.send(payloads, (err, data) => {
                    if (err) {
                        console.log('broker update failed');
                        console.log(err)
                    } else {
                        console.log('broker update success')
                        console.log(data);
                    }
                });
            });

            producer.on('error', function(err) {
                console.log(err);
                console.log('connection errored');
                throw err;
            });
        }
        catch(e) {
            console.log(e);
        }
    }
};
