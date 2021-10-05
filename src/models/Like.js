module.exports = (sequalize, type)=>{
    return sequalize.define('like',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        idPost:{
            type: type.INTEGER,
            allowNull : false
        },
        idUser: {
            type: type.INTEGER,
            allowNull : false
        }
    });
}