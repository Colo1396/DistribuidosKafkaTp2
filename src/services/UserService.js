const Op = require('sequelize').Op;
const {UserModel} = require('../connection ');

class UserService {

    static async add(usuarname,nombre,password){
        const newUser = {
            "usuarname" : usuarname,
            "nombre" : nombre,
            "password" : password
        }

        return await UserModel.create(newUser); 
    }

    static async getAll(){
        var users = await UserModel.findAll({
            raw: true,
            nest: true
         });
        return  {users: users};    
    }

    static async findUsersByUsername(username){
        var userFilters = await UserModel.findAll({
            where: { /** ME TRAE TODOS LOS USUARIOS QUE CUMPLAN EL PARAMETRO INDICADO*/
                usuarname :{
                    [Op.substring]: username      // LIKE '%username%'
                }
            },
            raw: true,
            nest: true 
        });

        return {userFilters : userFilters};
    }

}

module.exports = {
    UserService
}
