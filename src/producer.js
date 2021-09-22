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

module.exports = {
	follow,
	like
};
