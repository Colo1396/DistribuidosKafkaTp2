//const produce = require("./producer")
const server = require('./app');

// llamo a la funcion `produce` e imprime un error por consola si ocurre
/*produce().catch((err) => {
	console.error("Error en producer: ", err)
})*/

server.listen(process.env.PORT || 8080, ()=>{
    console.log('Escuchando el puerto', process.env.PORT || 8080);
});