const {Sequelize} = require('sequelize');

const userModel = require('./models/User');
const postModel = require('./models/Post');
const postSuscriptoModel = require('./models/PostSuscripto');

/** CONFIGURACIÓN CONEXION PARA LA BD */
const sequelize = new Sequelize("kafkaredsocial_db", "root", "toor" ,{
    host : "localhost",
    port: "3306",
    dialect: "mysql"
});

/*** REALIZO LOS MAPEOS DE LAS CLASES */
const UserModel = userModel(sequelize, Sequelize);
const PostModel = postModel(sequelize, Sequelize);
const PostSuscriptoModel = postSuscriptoModel(sequelize, Sequelize);


 /*** relacion one to many de User y Post **/
 UserModel.hasMany(PostModel, {
        foreignKey: 'idUser' , 
        as: 'posts'
    });
PostModel.belongsTo(UserModel, {
    foreignKey: 'idUser',
    as: 'user'
});

 /*** relacion one to many de User y PostSuscriptos **/
UserModel.hasMany(PostSuscriptoModel, {
    foreignKey: 'idUser' , 
    as: 'suscripciones'
});
PostSuscriptoModel.belongsTo(UserModel, {
    foreignKey: 'idUser',
    as: 'user'
});

/** INICIALIZO EL MAPEO **/
sequelize.sync({ force:false })
    .then( ()=>{
        console.log("Models mapeados!!!");
    });

/** EXPORTO LOS OBJETOS PARA PODER USARLOS PARA LAS CONSULTAS */
module.exports = {
    UserModel,
    PostModel,
    PostSuscriptoModel
}