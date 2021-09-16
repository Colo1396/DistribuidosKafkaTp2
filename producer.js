const { Kafka } = require("kafkajs") //dependencia para usar kafka con node
const clientId = "node"; /** client ID le hace saber a kafka quien produce los mensajes */
const brokers = ["localhost:9092"]; /** host  */
const topic = "testTopic"; /** el topic por donde se van a escribir los mensajes */

const kafka = new Kafka({ clientId, brokers }); /** initialize a new kafka client and initialize a producer from it */
const producer = kafka.producer()

/** esta funcion asincrona va a generar un msg cada 15 segundos **/
 const produce = async () => {
	await producer.connect();
	let i = 0

	//inicializo el intervalo de tiempo, 15 seg
	setInterval(async () => {
		try {
			// envio el mensaje al topic definido previamente
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: "Este es el mensaje --> " + i,
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

module.exports = produce
