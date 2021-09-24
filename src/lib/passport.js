const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //Autenticación de manera local
const {UserService} = require('../services/UserService');
const helpers = require('../lib/helpers');

//Autenticación de nombre local.signup
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username', //recibiré de la vista un usuario
  passwordField: 'password', //la contraseña
  passReqToCallback: true //para recibir mas datos, obtenidos desde el request
}, async (req, username, password, done) => { 
  //console.log("PASSPORT");

  //callback que se ejecuta despues de LocalStrategy
  //recibe el request, username y password, done (callback para continuar con el resto del codigo)
  const { name } = req.body;
  let newUser = {
    name,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password); //desde helpers, encripto la pass
  // Guardo el user
  const result = await UserService.add(newUser);  //almaceno el user
  //console.log(result.id);
  newUser.id = result.id;
  return done(null, newUser);
}));

//SERIALIZO EL USER EN BASE AL ID
passport.serializeUser((user, done) => {
  done(null, user.id); //vamos a poder guardar la session
});

//DESERIALIZO EN BASE AL ID
passport.deserializeUser(async (id, done) => {
  const users = await UserService.getById(id);
  done(null, users);
});