const {PostModel} = require('../connection ');

class PostService {

    static async add(newPost){
        return await PostModel.create(newPost); 
    }

    static async getAll(){
        var posts = await PostModel.findAll({
            raw: true,
            nest: true
         });
        return  {posts: posts};
    }

    static async getPostById(id){
        var post = await PostModel.findOne({
            where: { /** ME TRAE TODOS LOS USUARIOS QUE CUMPLAN EL PARAMETRO INDICADO*/
                idUser: id
            },
            raw: true,
            nest: true
         });
        return  {post};    
    }


}

module.exports = {
    PostService
}
