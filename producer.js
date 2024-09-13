const { kafka } = require("./client");
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init(){
    const producer = kafka.producer();

    console.log('Connecting producers')
    await producer.connect();
    console.log('Producers connected')

    rl.setPrompt('> ')
    rl.prompt();

    rl.on('line', async function(line){
        const [riderName, location] = line.split(' ');

        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location}),
                },
            ],
        });
    }).on('close', async () => {
        await producer.disconnect();
    }) 

}

init();

// ------------B----------------------
//Creating the producer from the kafka
//Connecting the producer
//producer.send() sens teh message to the specified kafka topic and then further specifying the partition also
// location-update is the key to identify the message
// ane the value is the actual message that is being sent as JSON object

// ------------D----------
//using readline to take the inputs
//taking the input and then using the producer.send ...
