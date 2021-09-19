const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const kafka = new Kafka({ clientId: "node" , brokers: ["localhost:9092"]} );


/*const consume = async (io, mensajes) =>{
    const consumer = kafka.consumer({ groupId: "node"}); 

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({topic: "testTopic", fromBeginning: true}); //para recibir los mensajes de este topic
    await consumer.run({ // empiza a recibir los mensajes 
        autoCommit: true,
        eachMessage: ({message})=>{
            console.log("el mensajes es ;",message.value)
            console.log("el message es ;",message.value)
            console.log("el mensajes string es ;",message.value.toString())
            console.log("el message string es ;",message.value.toString())
            console.log("el mensajes json es ;",JSON.parse(message.value.toString()))
            console.log("el message json es ;", JSON.parse(message.value.toString()))
            mensajes.push(`Consumer: Mensaje recibido: ${message.value}`);
            io.emit('chat message', `Consumer: Mensaje recibido: ${message.value}`);
        }
    });
}*/

//---------PROBANDO---------------
/*let listaPost =[]
const consume = async (io, mensajes) =>{
    const consumer = kafka.consumer({ groupId: "node"}); 

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({topic: "testTopic", fromBeginning: true}); //para recibir los mensajes de este topic
    await consumer.run({ // empiza a recibir los mensajes 
        autoCommit: true,
        eachMessage: ({message})=>{
           listaPost = listaPost.concat(JSON.parse(message.value.toString()));
           console.log(listaPost)
        }
    });
}*/

const consume = async (io, mensajes) =>{
    const consumer = kafka.consumer({ groupId: "node"}); 

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({topic: "testTopic", fromBeginning: true}); //para recibir los mensajes de este topic
    await consumer.run({ // empiza a recibir los mensajes 
        autoCommit: true,
        eachMessage: ({message})=>{
            console.log("el mensajes es ;",message.value)
            console.log("el message es ;",message.value)
            console.log("el mensajes string es ;",message.value.toString())
            console.log("el message string es ;",message.value.toString())
            console.log("el mensajes json es ;",JSON.parse(message.value.toString()))
            console.log("el message json es ;", JSON.parse(message.value.toString()))
            mensajes.push(`${message.value}`);
            io.emit('chat message', `${message.value}`);
        }
    });
}


module.exports = consume;
