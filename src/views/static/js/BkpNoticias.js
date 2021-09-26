

var topic = document.getElementById("topic");
var btnConsultar = document.getElementById("consultar");

const api_url = "http://localhost:8080"

btnConsultar.addEventListener('click', function () {
    //console.log('click')

    console.log({
        topic: topic.value,
        topic: topic1.value,
        topic: topic2.value
    })
    /*let listaTopicos = [{
        "topic": "topico1"
    }, {
        "topic": "topico2"
    }
    ]*/

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

    //----------------------------
    fetch(api_url + '/traerMensajes', {
        method: 'POST',
        headers: //new Headers()
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic: topic1.value
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

            const posteosDiv = document.getElementById('verNoticias1');
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

    //----------------------------
    fetch(api_url + '/traerMensajes', {
        method: 'POST',
        headers: //new Headers()
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topic: topic2.value
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

            const posteosDiv = document.getElementById('verNoticias2');
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

