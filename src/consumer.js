const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const kafka = new Kafka({ clientId: "node", brokers: ["localhost:9092"] });

const consume = async (io, mensajes) => {
    const consumer = kafka.consumer({ groupId: "node" });

    await consumer.connect(); //se conecta el consumidor 
    await consumer.subscribe({ topic: "testTopic", fromBeginning: true }); //para recibir los mensajes de este topic
    await consumer.run({ /** empiza a recibir los mensajes */
        autoCommit: true,
        eachMessage: ({ message }) => {
            mensajes.push(`Consumer: Mensaje recibido: ${message.value}`);
            io.emit('chat message', `Consumer: Mensaje recibido: ${message.value}`);
            io.emit('consume:post', `${message.value}`);
        }
    });
}


//------------------------------------------------------------------------------------------------------

const mostrarNoticia = async (req, res) => {
    try {
        const timestamp = Date.now();
        const consumer = kafka.consumer({ groupId: timestamp.toString() })
        await consumer.connect()
        //await consumer.subscribe({ topic: req.body.topic, fromBeginning: true })
        await consumer.subscribe({ topic: 'nuevaLista', fromBeginning: true })
        let post = [];

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
        }, 1000)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
//-----------------------------------------------------------------------

/*const mostrarNoticiasAutomaticamente = async (req, res) => {
    setInterval(async () => {
        try {
            const timestamp = Date.now();
            const consumer = kafka.consumer({ groupId: timestamp.toString() })
            await consumer.connect()
            //await consumer.subscribe({ topic: req.body.topic, fromBeginning: true })
            await consumer.subscribe({ topic: 'nuevaLista', fromBeginning: true })
            let post = [];

            await consumer.run({
                eachMessage: async ({ message }) => {
                    const value = message.value.toString()
                    console.log("el req.body", JSON.parse(value).msg)
                    post.push(JSON.parse(value).msg)
                },
            })

            //setTimeout(() => {
                //consumer.disconnect()
                res.render('noticias.ejs', { post })
            //}, 1000)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }, 15000);
}*/

module.exports = { consume, 
    mostrarNoticia
    //,mostrarNoticiasAutomaticamente 
};
