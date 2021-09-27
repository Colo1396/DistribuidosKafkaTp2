//const { response } = require("express");

var topic = document.getElementById("topic");
var topic1 = document.getElementById("topic1");
var topic2 = document.getElementById("topic2");
var containerNoticia = document.getElementById("verNoticias");
var btnConsultar = document.getElementById("consultar");

const api_url = "http://localhost:8080"

btnConsultar.addEventListener('click', function () {
    //listNoticias almacenara todos los msj a los que el consumer este asociado
    let listNoticias = [];
    //Genero un json con los topicos que recibo del formulario, en este caso 3
    let listTopicos = [{
        "topic": topic.value
    }, {
        "topic": topic1.value
    }
    , {
        "topic": topic2.value
    }
    ];  

    //Recorro la lista de topicos y llamo al a funcion que envia el topico al consumer para suscribirse y recibir las noticias asociadas
    listTopicos.forEach(topicos => {
        //le paso a la funcion el topico que acabo de leer
        traerMensajes(topicos)
    })


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
                    let objPOst = {
                        "topic": post.topic,
                        "msg": {
                            "topic": post.msg.topic,
                            "titulo": post.msg.titulo,
                            "imagen": post.msg.imagen,
                            "descripcion": post.msg.descripcion
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
        const div = document.createElement('div');
        div.className = '';
        div.innerHTML = `
            <div class="col-md-4">
                <div class="card bg-dark">
                    <div class="card-header text-white d-flex justify-content-between align-items-center">
                    ${paramPosteos.msg.topic}/${paramPosteos.msg.titulo}
                    </div>
                    <img class="card-img-top" src="${paramPosteos.msg.imagen}">
                    <div class="card-body text-light">
                    ${paramPosteos.msg.descripcion}
                    </div>
                </div>
            </div>
            `;

          //incluyo en el nodo div uno nuevo  
        paramIdHtml.appendChild(div);
    }

//-------------------------------------------------------------------------
/* // Lo mismo que arriba pero sin usar funciones y mas rustico.
listTopicos.forEach(topicos => {
    //console.log("el valor del topico es", topicos.topic)
    fetch(api_url + '/traerMensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            topic: topicos.topic
        })
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                //console.log("post", post)
                //console.log("post.msg", post.msg)

                let objPOst = {
                    "topic": post.topic,
                    "msg": {
                        "topic": post.msg.topic,
                        "titulo": post.msg.titulo,
                        "imagen": post.msg.imagen,
                        "descripcion": post.msg.descripcion
                    }

                }
                //console.log("objPOst", objPOst)
                listNoticias.push(objPOst)
                //console.log("postAux", postAux)
                const posteosDiv = document.getElementById('verNoticias');
                posteosDiv.innerHTML = ``;
                listNoticias.forEach(posteos => {
                    const div = document.createElement('div');
                    div.className = '';
                    div.innerHTML = `
                        <div class="col-md-4">
                            <div class="card bg-dark">
                                <div class="card-header text-white d-flex justify-content-between align-items-center">
                                ${posteos.msg.topic}/${posteos.msg.titulo}
                                </div>
                                <img class="card-img-top" src="${posteos.msg.imagen}">
                                <div class="card-body text-light">
                                ${posteos.msg.descripcion}
                                </div>
                            </div>
                        </div>
                        `;
                    posteosDiv.appendChild(div);
                });
            });
        })

})
*/
//-------------------------------------------------------------------------


});

