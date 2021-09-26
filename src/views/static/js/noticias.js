//const { response } = require("express");

var topic = document.getElementById("topic");
var btnConsultar = document.getElementById("consultar");

const api_url = "http://localhost:8080"

btnConsultar.addEventListener('click', function () {

    let post = [];
    let postAux = [];
    let listNoticias = [];

    let posteos = [
        {
            "topic": "topico1",
            "msg": {
                "topic": "post",
                "titulo": "Rick y Morty",
                "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYl6MPPo3YndGtPNT6irDc2YVHA6UzXAziw&usqp=CAU",
                "descripcion": "Serie"
            }
        },
        {
            "topic": "topico2",
            "msg": {
                "topic": "post",
                "titulo": "Horizont",
                "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBKU4GfF-8j6SslS7q7c1lanlSbLp47r8pg&usqp=CAU",
                "descripcion": "juego"
            }
        },
        {
            "topic": "topico3",
            "msg": {
                "topic": "post",
                "titulo": "HollowKnigh",
                "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
                "descripcion": "juego"
            }
        }
    ];

    let posteos2 = [
        [{
            "topic": "topico1",
            "msg": {
                "topic": "post",
                "titulo": "Rick y Morty",
                "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYl6MPPo3YndGtPNT6irDc2YVHA6UzXAziw&usqp=CAU",
                "descripcion": "Serie"
            }
        }],
        [{
            "topic": "topico2",
            "msg": {
                "topic": "post",
                "titulo": "Horizont",
                "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBKU4GfF-8j6SslS7q7c1lanlSbLp47r8pg&usqp=CAU",
                "descripcion": "juego"
            }
        }],
        [{
            "topic": "topico3",
            "msg": {
                "topic": "post",
                "titulo": "HollowKnigh",
                "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
                "descripcion": "juego"
            }
        },
        {
            "topic": "topico3",
            "msg": {
                "topic": "post",
                "titulo": "HollowKnigh",
                "imagen": "https://store-images.s-microsoft.com/image/apps.18195.14259955503324792.fee0f975-9292-4852-ad19-c6ec880d57d3.35e9f104-1086-48a4-a429-c1c8dd863347?w=180&h=270&q=60",
                "descripcion": "juego"
            }
        }]
    ];
    //console.log("la lista de post es:", post)

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
                    console.log("objPOst", objPOst)
                    postAux.push(objPOst)
                    console.log("postAux", postAux)


                    const posteosDiv = document.getElementById('verNoticias');
                    posteosDiv.innerHTML = ``;
                    postAux.forEach(posteos => {
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

    //QUIERO LLENAR LA LISTA CON LOS MSJ DE LOS TOPICOS Y  RECORRERLA PARA IMPRIMR LA IMAGEN
    console.log("la lista de post es:", post)
    // console.log("la lista de posteos es:", posteos)
    // console.log("la lista de posteos2 es:", posteos2)
    console.log("la lista de postAux es:", JSON.stringify(postAux))

    //--------------------------------
    console.log("la postAux es:", postAux)
    console.log("la lista de postAux es:", JSON.stringify(postAux))
    postAux.forEach(datosPOst => {
        console.log("post  :datosPOst =>", datosPOst)
    });


    //Imprime lista  de posteos como "posteos"
    /*const posteosDiv = document.getElementById('verNoticias');
    posteosDiv.innerHTML = ``;
    posteos.forEach(posteos => {
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
    });*/
    //--------------------------------

    //Imprime lista de listas de posteos como "posteos2"
    /*const posteosDiv = document.getElementById('verNoticias');
    posteosDiv.innerHTML = ``;

    posteos2.forEach(datos => {

        console.log("posteos 2 :datos =>", datos)
        datos.forEach(mensaje => {
            console.log("posteos 2 :datos => mensjae=>", mensaje.msg)
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                            <div class="col-md-4">
                                <div class="card bg-dark">
                                    <div class="card-header text-white d-flex justify-content-between align-items-center">
                                    ${mensaje.msg.topic}/${mensaje.msg.titulo}
                                    </div>
                                    <img class="card-img-top" src="${mensaje.msg.imagen}">
                                    <div class="card-body text-light">
                                    ${mensaje.msg.descripcion}
                                    </div>
                                </div>
                            </div>
                            `;
            posteosDiv.appendChild(div);

        });

    });
*/


});

