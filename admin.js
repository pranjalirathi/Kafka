const { kafka } = require("./client");

//Function to make a admin and connect it to the port
async function init(){
    const admin = kafka.admin();

    console.log('Admin Connecting');
    admin.connect();
    console.log("Admin Connection Successful");

    console.log("Creating the topics and partitions");

    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2
            }
        ]
    });

    console.log("Topics Created successfully");

    console.log("Disconencting the admin")
    await admin.disconnect();

}

init();

//-----------------------A---------------------
//creating the admin
//connecting the admin
//creating the topics array by the admin with sprcific parameters like partitions, topic name , replication factor etc
//disconnecting the admin at last
//and finally calling the function

