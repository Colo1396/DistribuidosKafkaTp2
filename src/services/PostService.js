const {PostModel} = require('../connection ');

class PostService {

    static async add(titulo,imagen,texto, idUsuario){
        const newPost = {
            "titulo" : titulo,
            "texto" : texto,
            "imagen" : imagen,
            "idUser" : idUsuario
        }

        return await PostModel.create(newPost); 
    }

    static async getAll(){
        var posts = await PostModel.findAll({
            raw: true,
            nest: true
         });
        return  {posts: posts};
    }

}

module.exports = {
    PostService
}
