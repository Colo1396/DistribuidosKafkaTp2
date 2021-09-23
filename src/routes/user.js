const {UserService} = require('../services/UserService');

/*
 * GET pagina de registro
 */

exports.getRegister = function(req, res){
    res.render('register', { page_title: 'Registro de usuario' });
  };

exports.register =  async (req,res)=>{
  var newUser = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
    };
  await UserService.add(newUser); 
  res.render('login', { mensaje: 'Usuario registrado correctamente.' });
};

exports.login = function(req, res){
    //convierte en un string el body para trabajarlo como un json
    //almacenandolo en una var aux
    var input = JSON.parse(JSON.stringify(req.body));
      //almacenamos en una variable auxiliar el contenido de los 
      //campos de post del formulario
      var user = req.body.username;
      var pass = req.body.password;
  
      req.getConnection(function(err,connection){
         //para conectarse a la bd
          var query = connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?',[user,pass],function(err,rows)
          {
              
              if(err)
                  console.log("Error Selecting : %s ",err );
       
              if (rows.length == 0){ //el usuario no existe
                res.render('index', { page_title: 'Login de usuarios',msj: 'Usuario inexistente, verifique los datos e ingrese nuevamente' });
              }else {
                //el usuario existe
                //creamos las variables de session con los datos del formulario
                req.session.username=req.body.username;
                req.session.password=req.body.password; 
                res.redirect('/');
              } 
              
             
           });
           
      }); 
  };
  