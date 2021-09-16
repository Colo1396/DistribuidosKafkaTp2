const produce = require("./producer")
const consume = require("./consumer")

// llamo a la funcion `produce` e imprime un error por consola si ocurre
produce().catch((err) => {
	console.error("Error en producer: ", err)
})

// llamo a la funcion "consume" , e imprime cualquier error
consume().catch((err) => {
	console.error("Error en consumer: ", err)
})