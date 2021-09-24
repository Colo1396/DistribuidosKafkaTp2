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
