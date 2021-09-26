//const { response } = require("express");

var topic = document.getElementById("topic");
var btnConsultar = document.getElementById("consultar");

const api_url = "http://localhost:8080"

btnConsultar.addEventListener('click', function () {

    let listNoticias = [];

    let topicos = [{
        "topic": "topico1"
    }, {
        "topic": "topico2"
    }, {
        "topic": "topico3"
    }
    ]
    //console.log("topicos", topicos)

    topicos.forEach(topicos => {
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
});

