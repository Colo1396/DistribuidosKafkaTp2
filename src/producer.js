const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const clientId = "node"; /** client ID le hace saber a kafka quien produce los mensajes */
const brokers = ["localhost:9092"]; /** host  */
const topic = "testTopic"; /** el topic por donde se van a escribir los mensajes */

const kafka = new Kafka({ clientId, brokers }); /** initialize a new kafka client and initialize a producer from it */
const producer = kafka.producer()

/** esta funcion asincrona va a generar un msg cada 15 segundos **/
 const guardarNoticia = async () => {
	await producer.connect();
	let i = 0

	//Ejemplo para guardar cuando el productor genera un msj
	/*let newPost ={
        "topic":"usuario",
        "titulo":"hola juan carlo",
        "imagen":"https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
        "descripcion":"Hello world"	
	}*/

	let newPost ={
		"topic": "jamon",
		"msg": {
					"topic": "Naza",
					"titulo": "hola juan carlo",
					"imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
					"descripcion": "Hello world"
				}
	}


	//inicializo el intervalo de tiempo, 15 seg
	setInterval(async () => {
		try {
			// envio el mensaje al topic definido previamente
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: JSON.stringify(newPost),
					},
				],
			})

			console.log(`Producer: El mensaje ${i} fue escrito con exito!!!`);
			i++
		} catch (err) {
			console.error("No se pudo escribir el mensaje debido a --> " + err)
		}
	}, 15000);
}


/** esta funcion asincrona va a generar un msg cada 15 segundos **/
const produce = async (req, res) => {
	await producer.connect();
	let i = 0
	let newPost ={
		"topic": "jamon",
		"msg": {
					"topic": "Naza",
					"titulo": "hola juan carlo",
					"imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
					"descripcion": "Hello world"
				}
	}


	//inicializo el intervalo de tiempo, 15 seg
	setInterval(async () => {
		try {
			console.log("guardo el nuevo msj")
			console.log(newPost)
			console.log("guardo el req.body en la constante msg con el json.stringfy")
			const msg = JSON.stringify(newPost)
			console.log("guardo el nuevo msj despues de hacerlo un json", msg)
			console.log("este es el req body topic:", newPost.topic)
	
			await producer.send({
				topic:newPost.topic,
				messages: [
					{value:msg},
				],
				/*topic: 'topic-name',
				messages: [
					{ key: 'key1', value: 'hello world' },
					{ key: 'key2', value: 'hey hey!' }
				],*/
			})
			//await producer.disconnect()
			//res.send('mensaje guardado');
			console.log("mensaje guardado")
		} catch (error) {
			console.log(error);
			console.log("ERROR")
			//res.send("error")
		}
	}, 15000);
}

module.exports = produce
