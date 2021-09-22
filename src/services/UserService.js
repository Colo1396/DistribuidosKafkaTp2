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

}

module.exports = {
    UserService
}
