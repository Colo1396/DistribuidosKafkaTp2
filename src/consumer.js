const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const kafka = new Kafka({ clientId: "node" , brokers: ["localhost:9092"]} );

const consume = async (io, mensajes) =>{
    const consumer = kafka.consumer({ groupId: "node"}); 

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({topic: "juan_notificaciones", fromBeginning: true}); //para recibir los mensajes de este topic
    await consumer.run({ /** empiza a recibir los mensajes */
        autoCommit: true,
        eachMessage: ({message})=>{
            io.emit('notificacion', `${message.value}`);
        }
    });
}

module.exports = consume;
