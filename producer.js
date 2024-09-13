const { kafka } = require("./client")

async function init(){
    const producer = kafka.producer();

    console.log('Connecting producers')
    await producer.connect();
    console.log('Producers connected')

    await producer.send({
        topic: 'rider-updates',
        messages: [
            {
                partition: 0,
                key: "location-updates",
                value: JSON.stringify({name: "Abhimanyu K", loc: "South India"}),
            }
        ]
    });

    await producer.disconnect();
}

init();
