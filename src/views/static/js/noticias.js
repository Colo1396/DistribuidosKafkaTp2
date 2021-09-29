//const { response } = require("express");

var containerNoticia = document.getElementById("verNoticias");

const api_url = "http://localhost:8080/noticias"

//listNoticias almacenara todos los msj a los que el consumer este asociado
let listNoticias = [];
//Genero un json con los topicos que recibo del formulario, en este caso 3
let listTopicos = [];

fetch(api_url + '/traerTopics', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
})
.then(res => res.json())
.then(data => {
    data.forEach(topic => {
        const newTopic = {'topic': topic + '_posts'}
        console.log(newTopic);
        traerMensajes(newTopic);
    })
});

// //Recorro la lista de topicos y llamo al a funcion que envia el topico al consumer para suscribirse y recibir las noticias asociadas
// listTopicos.forEach(topicos => {
//     //le paso a la funcion el topico que acabo de leer
//     traerMensajes(topicos)
// })


function traerMensajes(paramTopico){
    //Llamo al metodo post traerMensajes el cual devuelve un listado con los msj guardados en kafka dependiendo del topic
    fetch(api_url + '/traerMensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //paso como parametro el topico que ingrese en el formulario y se guardo en la listTopicos
            topic: paramTopico.topic
        })
    })
    //me traigo el response del lo que devolvio /traerMensajes
        .then(response => response.json())
        .then(data => {
            //recorro la data que esta dentro del response.json
            data.forEach(post => {
                
                //genero un objeto en base a los datos recibidos
                const objPOst = {
                    "topic" : post.topic, 
                    "msg": {
                        "titulo" : post.msg.titulo,
                        "imagen" : post.msg.imagen,
                        "texto" : post.msg.texto,
                        "idUser" : post.msg.idUser
                    }
                }
                
                //pusheo a la lista el objeto recien armado, para almacenar los msj de distintos topicos
                listNoticias.push(objPOst)
                
                //En base a la lista de noticias que voy complentando, agrego en el HTML la noticia
                containerNoticia.innerHTML = ``;
                //recorro la lista de noticias
                listNoticias.forEach(posteos => {
                    //llamo a la funcion la cual me agrega html para imprimir la noticia
                    renderNoticia(posteos,containerNoticia)

                });
            });
        })

}

//Funcion para rellenar el html con la noticia
function renderNoticia(paramPosteos,paramIdHtml){
    //creo un nuevo div el cual almacenara mi noticia
    const user = paramPosteos.topic.split('_')[0];

    const div = document.createElement('div');
    div.className = "col-4";
    div.innerHTML = `
        <div class="card shadow-sm">
            <img class="card-img-top" src="${paramPosteos.msg.imagen}">
            <div class="card-body">
                <h5 class="card-title" align="center">${paramPosteos.msg.titulo}</h5>
                <p class="card-text">${paramPosteos.msg.texto}</p>
                <small class="text-muted">By: ${user}</small>
                <div class="justify-content-between align-items-center">
                    <div align="right">
                        <button class="like" style="font-size: 2em; color: Dodgerblue;" align="right" onclick="like('${paramPosteos.msg.idUser}')">
                            <i class="far fa-thumbs-up"></i>
                        </button>
                    </div>
                </div>
            </div>       
        </div>
        `;

        //incluyo en el nodo div uno nuevo  
    paramIdHtml.appendChild(div);
}
