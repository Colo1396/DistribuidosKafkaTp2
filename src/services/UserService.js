const {UserModel} = require('../connection ');

class UserService {
/*
    static async add(username,nombre,password){
        const newUser = {
            "username" : username,
            "nombre" : nombre,
            "password" : password
        }

        return await UserModel.create(newUser); 
    }
*/

    static async add(newUser){
        return await UserModel.create(newUser); 
    }

    static async getAll(){
        var users = await UserModel.findAll({
            raw: true,
            nest: true
         });
        return  {users: users};    
    }

    static async getById(id){
        var users = await UserModel.findByPk(id);
        console.log("USER");
        console.log(users);
        return  {users: users};    
    }
}

module.exports = {
    UserService
}
