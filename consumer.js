const { kafka } = require("./client");
const group = process.argv[2]

async function init(){
    const consumer = kafka.consumer({groupId: group})
    await consumer.connect();

    await consumer.subscribe({topics: ["rider-updates"] , fromBeginning: true});

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause}) => {
            console.log(`${group}: [${topic}]: PART:${partition}:`, message.value.toString())
        },
    });

    console.log("Going in the end of consumer.js")

}

init();


// ----------------------C--------------------
//Connecting the consumer
//The group id being given to create the consumer groups
//Subscribing teh topics by the consumer
//We can also let them subscribe for multiple topics


//--------------E------------------
//  process.argv array in Node.js to capture command-line arguments passed to the script when it's run.
// In the line const group = process.argv[2];, we're assigning the third element in the process.argv array (i.e., the first custom argument) to the variable group.

