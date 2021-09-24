const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 

const consume = require("./consumer");
const produce = require('./producer');

//SERVICES--------------------------------------
const {PostService} = require('./services/PostService');
const {PostSuscriptoService} = require('./services/PostSuscriptoService');
//---------------------------------------------------
//REGISTRO
var user = require('./routes/user'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server);

require('./lib/passport');

//MIDDLEWARES------------------------------------------
app.use(express.urlencoded({extended:false}))//para q cuando envien un POST desde un form lo entienda
app.use(express.json());//para q entienda objetos json
app.use(morgan('dev'));
app.use(cors());//para q permita q cualquier servidor pida cosas y haga operaciones
app.use(express.static(path.join(__dirname, './views/static')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(session({
    secret: 'DistribuidosTp2',
    resave : true,
    saveUninitialized: true,
}));
app.use(flash()); 
//passport
app.use(passport.initialize());
app.use(passport.session());

//SETTINGS---------------------------------------------
app.set('json spaces', 2);
app.set('view engine', 'hbs'); //CAMBIO PUG POR HBS
app.set('views', './src/views');

//VARIABLES GLOBALES-----------------------------------
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//ROUTES-----------------------------------------------
//USER
app.get('/register', user.getRegister);
app.post('/register', user.register);
app.get('/login', user.getLogin);
app.post('/login', user.login);
app.get('/perfil', user.perfil);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', (req, res) => {
    res.render('home.pug');
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

io.on('connection', (socket) => {
    console.log('a user connected'); 
});

module.exports = server;
