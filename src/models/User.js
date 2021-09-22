module.exports = (sequalize, type)=>{
    return sequalize.define('Usuario',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        usuarname: {
            type: type.STRING,
            allowNull : false
        },
        password: {
            type: type.STRING,
            allowNull : false
        }
    });
}
