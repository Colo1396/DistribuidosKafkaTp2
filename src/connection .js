const {Sequelize} = require('sequelize');

const userModel = require('./models/User');
const postModel = require('./models/Post');
const subscripcionModel = require('./models/Subscripcion');

/** CONFIGURACIÓN CONEXION PARA LA BD */

const sequelize = new Sequelize("kafkaredsocial_db", "root", "123456789" ,{
    host : "localhost",
    port: "3306",
    dialect: "mysql"
});

/*
const sequelize = new Sequelize("bbvz5ubbkmmsymn7s0pm", "u1k3xrdtrvnoxfts", "229roI7cszThaIgUcPHT" ,{
     host : "bbvz5ubbkmmsymn7s0pm-mysql.services.clever-cloud.com",
     port: "3306",
     dialect: "mysql"
 });
 */

/*** REALIZO LOS MAPEOS DE LAS CLASES */
const UserModel = userModel(sequelize, Sequelize);
const PostModel = postModel(sequelize, Sequelize);
const SubscripcionModel = subscripcionModel(sequelize, Sequelize);


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
UserModel.hasMany(SubscripcionModel, {
    foreignKey: 'idUser' , 
    as: 'suscripciones'
});
SubscripcionModel.belongsTo(UserModel, {
    foreignKey: 'idUser',
    as: 'user'
});

/** INICIALIZO EL MAPEO **/
sequelize.sync({ force: false})
    .then( ()=>{
        console.log("Models mapeados!!!");
    });

/** EXPORTO LOS OBJETOS PARA PODER USARLOS PARA LAS CONSULTAS */
module.exports = {
    UserModel,
    PostModel,
    SubscripcionModel, 
    sequelize
}