//const { render } = require("ejs");

var topic = document.getElementById("topic");
var btnConsultar = document.getElementById("consultar");

const api_url = "http://localhost:8080"

btnConsultar.addEventListener('click', function () {
    //console.log('click')

    let data = [{
        "topic": "topico1"
    }, {
        "topic": "topico2"
    }
    ]



    fetch(api_url + '/traerMensajes', {
        method: 'POST',
        headers: //new Headers()
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic: topic.value
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let post = [];
            post = data.json
            console.log(post)
            //render('noticias.ejs')
            //render('noticias.ejs', { post })
            //debugger

            const posteosDiv = document.getElementById('verNoticias');
            posteosDiv.innerHTML = ``;
            data.forEach(post => {
                const div = document.createElement('div');
                div.className = '';
                /*div.innerHTML=`
                <div>${post.msg.titulo}/div>
                `;*/
                div.innerHTML = `
            <div class="col-md-4">
                <div class="card bg-dark">
                    <div class="card-header text-white d-flex justify-content-between align-items-center">
                    ${post.msg.topic}/${post.msg.titulo}
                    </div>
                    <img class="card-img-top" src="${post.msg.imagen}">
                    <div class="card-body text-light">
                    ${post.msg.descripcion}
                    </div>
                </div>
            </div>
            `;
                posteosDiv.appendChild(div);
            });














        })

});

