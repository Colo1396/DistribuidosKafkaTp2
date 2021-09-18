const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const consume = require("./consumer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//MIDDLEWARES------------------------------------------
app.use(express.urlencoded({extended:false}))//para q cuando envien un POST desde un form lo entienda
app.use(express.json());//para q entienda objetos json
app.use(morgan('dev'));
app.use(cors());//para q permita q cualquier servidor pida cosas y haga operaciones
app.use(express.static(path.join(__dirname, './views/static')));

//SETTINGS---------------------------------------------
app.set('json spaces', 2);
app.set('view engine', 'pug');
app.set('views', './src/views');

//ROUTES-----------------------------------------------
app.get('/', (req, res) => {
    var mensajes = []
    res.render('home', { mensajes: mensajes });
    // llamo a la funcion "consume" , e imprime cualquier error
    consume(io, mensajes).catch((err) => {
        console.error("Error en consumer: ", err)
    })
});

io.on('connection', (socket) => {
    console.log('a user connected'); 
});

module.exports = server;
