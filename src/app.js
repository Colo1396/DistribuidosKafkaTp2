const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const consume = require("./consumer");
const fs =require('fs');

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
app.set('view engine', 'html');
app.set('views', './src/views');

//ROUTES-----------------------------------------------
app.get('/', (req, res) => {
    console.log("EL MSJ DEL CONSUMER ES:",socket.on('chat message', (msg)))
    var mensajes = []
    res.render('home.pug', { mensajes: mensajes });
    // llamo a la funcion "consume" , e imprime cualquier error
    consume(io, mensajes).catch((err) => {
        console.error("Error en consumer: ", err)
    })
});


//ESTE METODO MUESTRA LA NOTICIA EN BASE AL ARCHIVO DE JSON DE POST
const json_post = fs.readFileSync('src/post.json','utf-8');
let post =JSON.parse(json_post);
app.get('/noticiasDesdeArchivoJson', (req, res) => {
    res.render('noticias.ejs',{post})
});

//ESTE METODO MUESTRA LA NOTICIA EN BASE AL a un msj con formato json
app.get('/noticiasDesdeCadenaTipoJson', (req, res) => {

    let post =
    [
        {
            "topic": "usuario",
            "titulo": "hola juan carlo",
            "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
            "descripcion": "Hello world"
        },
        {
            "topic": "usuario",
            "titulo": "hola juan carlo",
            "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
            "descripcion": "Hello world"
        }
    ]
    res.render('noticias.ejs',{post})
});

/*//ESTE METODO MUESTRA LA NOTICIA EN HTLM PROBANDO CON RO
app.get('/noticiasHtml', (req, res) => {
    let post =
    [
        {
            "topic": "usuario",
            "titulo": "hola juan carlo",
            "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
            "descripcion": "Hello world"
        },
        {
            "topic": "usuario",
            "titulo": "hola juan carlo",
            "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
            "descripcion": "Hello world"
        }
    ]
    res.render('noticias.html', { post: post });

});*/

//---------PROBANDO---------------





//----SOCKET----------------------------

io.on('connection', (socket) => {
    console.log('a user connected'); 
});

module.exports = server;
