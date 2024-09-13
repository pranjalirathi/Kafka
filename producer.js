const { kafka } = require("./client");
const readline = require('readline')

//for input from the user
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
                    value: JSON.stringify({name:riderName, location}),
                }
            ]
        });
    }).on('close', async () => {
        await producer.disconnect();
    }) 

}

init();
