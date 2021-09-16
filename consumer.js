const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const kafka = new Kafka({ clientId: "node" , brokers: ["localhost:9092"]} );

const consume = async()=>{
    const consumer = kafka.consumer({ groupId: "node", fromBeginning:true}); 

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({topic: "testTopic"}); //para recibir los mensajes de este topic
    await consumer.run({ /** empiza a recibir los mensajes */
        autoCommit: true,
        eachMessage: ({message})=>{
			console.log(`Consumer: Mensaje recibido: ${message.value}\n`);
        }
    });
}

module.exports = consume;
