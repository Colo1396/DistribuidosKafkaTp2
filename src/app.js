const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const consume = require("./consumer");
const produce = require('./producer');

//SERVICES--------------------------------------
const {PostService} = require('./services/PostService');
const {PostSuscriptoService} = require('./services/PostSuscriptoService');
const {UserService} = require('./services/UserService');
//---------------------------------------------------

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
app.set('view engine', 'ejs');
app.set('views', './src/views');

//ROUTES-----------------------------------------------
app.get('/', (req, res) => {
    res.render('home');
    // llamo a la funcion "consume" , e imprime cualquier error
    consume(io).catch((err) => {
        console.error("Error en consumer: ", err)
    });
});

app.post('/users/123/follow', (req, res) => {
    produce
    .follow('juan_notificaciones', 'Marta')
    .catch((err) => {
        console.error("Error en producer: ", err);
    });
    res.end();
});

app.post('/posts/123/like', (req, res) => {
    produce
    .like('juan_notificaciones', '123', 'Marta')
    .catch((err) => {
        console.error("Error en producer: ", err);
    });
    res.end();
});

app.get('/pruebaMapeo', async (req,res)=>{
    console.log(await PostService.getAll()); 
});


//-------------------------------------
app.post('/postearUno', produce.guardarUnaNoticia)
app.get('/verPost', consume.mostrarNoticia)
//-------------------------------------

io.on('connection', (socket) => {
    console.log('a user connected'); 
});

module.exports = server;
