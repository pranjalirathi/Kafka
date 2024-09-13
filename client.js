//Importing kafka
const { Kafka } = require("kafkajs");

//Creating teh KAFKA Client
//The whole service running on 9092 is the broker
exports. kafka = new Kafka({
    clientId: "MyKafka",
    brokers: ['172.27.128.1:9092']
})
