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

//--------------------------------
//recbe del req.body un json con el topico al cual se suscribe y muestra los msj que tenga kafka de ese topico.
const mostrarNoticia = async (req, res) => {
    try {
        const timestamp = Date.now();
        const consumer = kafka.consumer({ groupId: timestamp.toString() })
        await consumer.connect()
        //await consumer.subscribe({ topic: req.body.topic, fromBeginning: true })
        await consumer.subscribe({ topic: 'nuevaLista', fromBeginning: true })
        let post = [];
        //let retorno = [];
        await consumer.run({
            eachMessage: async ({ message }) => {
                const value = message.value.toString()
                console.log("el req.body", JSON.parse(value).msg)
                post.push(JSON.parse(value).msg)
            },
        })

        setTimeout(() => {
            consumer.disconnect()
            res.render('noticias.ejs', { post })
            //res.send(retorno);
        }, 1000)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const traerMensajes = async (req, res) => {
    console.log("llegue a traer mensajes :)")
    try {
        const timestamp = Date.now();
        const consumer = kafka.consumer({ groupId: timestamp.toString() })
        await consumer.connect()
        await consumer.subscribe({ topic: req.body.topic, fromBeginning: true })

        let retorno = [];
        //let post=retorno
        await consumer.run({
            eachMessage: async ({ message }) => {
                const value = message.value.toString()
                retorno.push(JSON.parse(value))
            },
        })

        setTimeout(() => {
            consumer.disconnect()
            res.send(retorno);
            //res.render('noticias.ejs', { retorno })
        }, 1000)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


//--------------------------------

module.exports = {
consume,
mostrarNoticia,traerMensajes
};