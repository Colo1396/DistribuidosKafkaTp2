const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const clientId = "node"; /** client ID le hace saber a kafka quien produce los mensajes */
const brokers = ["localhost:9092"]; /** host  */
const topic = "testTopic"; /** el topic por donde se van a escribir los mensajes */
const fs =require('fs');
const { json } = require("express");

const kafka = new Kafka({ clientId, brokers }); /** initialize a new kafka client and initialize a producer from it */
const producer = kafka.producer()

const post =[];

/** esta funcion asincrona va a generar un msg cada 15 segundos **/
 const produce = async () => {
	await producer.connect();
	let i = 0

	let newPost ={
        "topic":"usuario",
        "titulo":"hola juan carlo",
        "imagen":"https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
        "descripcion":"Hello world"	
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
						//value: "Este es el mensaje --> " + i + JSON.stringify(newPost),
						value: JSON.stringify(newPost),
					},
				],
			})

			console.log(`Producer: El mensaje ${i} fue escrito con exito!!!`);
			i++
			post.push(newPost)
			const json_post =JSON.stringify(post)
			fs.writeFileSync('src/post.json',json_post,'utf-8');
		} catch (err) {
			console.error("No se pudo escribir el mensaje debido a --> " + err)
		}
	}, 15000);
}

module.exports = produce
