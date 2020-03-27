const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('./config/kafka');
const kafka = require('kafka-node');
const bp = require('body-parser');
const port = 4000;
const cors = require('cors');

// you should get access to the database just reach out to me
mongoose.connect('mongodb+srv://db_user:db_password@cluster0-bggo9.mongodb.net/RestaurantManagementSystem?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once('open', () => {
     console.log('connection established');
     console.log(mongoose.connection.readyState);
});
app.use(cors());
app.use('/graphql', graphqlHTTP({
     schema,
     //graphiql: true //enables graphql frontend to test queries

}));
app.listen(port, () => console.log(`App listening on port ${port}!`));

// you should have a broker runnning on localhost:9092  Result ==> see console
app.use('/producing', () => {
     try {
          const Producer = kafka.Producer;
          const client = new kafka.KafkaClient(config.kafka_server);
          console.log('client', client);
          const producer = new Producer(client);
          let payloads = [
               {
                    topic: config.kafka_topic,
                    messages: config.kafka_message
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
});
//you can connect to the same broker mentioned above  Result ==> see console
app.use('/consuming', () => {
     try {
          const Consumer = kafka.Consumer;
          const client = new kafka.KafkaClient(config.kafka_server);
          let consumer = new Consumer(
              client,
              [{ topic: config.kafka_topic, partition: 0 }],
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
          })
          consumer.on('error', function(err) {
               console.log('error', err);
          });
     }
     catch(e) {
          console.log(e);
     }
});