const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const clientId = "node"; /** client ID le hace saber a kafka quien produce los mensajes */
const brokers = ["localhost:9092"]; /** host  */

const kafka = new Kafka({ clientId, brokers }); /** initialize a new kafka client and initialize a producer from it */
const producer = kafka.producer()

/** esta funcion asincrona va a generar un msg cada 15 segundos **/
const follow = async (topic, name) => {
	try{
		await producer.connect();
		await producer.send({
			topic: topic,
			messages: [{ 
				value: JSON.stringify({ type: 'FOLLOW', name: name })
			}]
		});
	} catch(err){
		console.error(err);
	}
}

const like = async (topic, post, name) => {
	try{
		await producer.connect();
		await producer.send({
			topic: topic,
			messages: [{ 
				value: JSON.stringify({ type: 'LIKE', post: post, name: name }) 
			}]
		});
	} catch(err){
		console.error(err);
	}
}

//--------------------------------
//Post de una noticia /posteo enviado a traves de json con el topico y el msj que lo toma del request.
const guardarMensaje = async (req, res) => {
    try {
        await producer.connect()
        console.log("guardo el nuevo msj")
        console.log(req.body)
        console.log("guardo el req.body en la constante msg con el json.stringfy")
        const msg = JSON.stringify(req.body)
        console.log("guardo el nuevo msj despues de hacerlo un json", msg)
        console.log("este es el req body topic:", req.body.topic)

        await producer.send({
            topic:req.body.topic,
            messages: [
                {value:msg},
            ],
            /*topic: 'topic-name',
            messages: [
                { key: 'key1', value: 'hello world' },
                { key: 'key2', value: 'hey hey!' }
            ],*/
        })
        await producer.disconnect()
        res.send('mensaje guardado');
    } catch (error) {
        console.log(error);
        res.send("error")
    }
}

//Post de una noticia /posteo enviado a traves de json con el topico y el msj que lo toma del json de ejemplo.
const guardarUnaNoticia = async (req, res) => {
	await producer.connect();

	let newPost = {
		"topic": "nuevaLista",
		"msg": {
			"topic": "Mary",
			"titulo": "hola juan carlo",
			"imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
			"descripcion": "Hello world"
		}
	}
	try {
		console.log("guardo el nuevo msj")
		console.log(newPost)
		console.log("guardo el req.body en la constante msg con el json.stringfy")
		const msg = JSON.stringify(newPost)
		console.log("guardo el nuevo msj despues de hacerlo un json", msg)
		console.log("este es el req body topic:", newPost.topic)

		await producer.send({
			topic: newPost.topic,
			messages: [
				{ value: msg },
			],
		})

		await producer.disconnect()
		res.send('mensaje guardado');

	} catch (error) {
		console.log(error);
		console.log("ERROR")
		res.send("error")
	}

}
//--------------------------------
module.exports = {
	follow,
	like,
	guardarMensaje,guardarUnaNoticia	
};
