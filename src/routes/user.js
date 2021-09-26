const {UserService} = require('../services/UserService');

const passport = require('passport');

/*
 * GET pagina de registro
 */

exports.getRegister = function(req, res){
    res.render('register', { page_title: 'Registro de usuario' });
  };

exports.register =  passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/register',
    failereFlash: true
}); //especifico donde quiero que vaya si se autentica o si falla

exports.getLogin = function(req, res){
  res.render('login', { page_title: 'login' });
};

exports.login = function(req, res){
  console.log("user js");
  passport.authenticate('local.signin', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true
  })(req, res);
};

exports.inicio = function(req, res){
  res.render('inicio', { page_title: 'Inicio' });
};