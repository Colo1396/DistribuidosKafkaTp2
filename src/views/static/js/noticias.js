var socket = io();

var listaMsg = document.getElementById("mensajes");

var post = `
<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="https://via.placeholder.com/150" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 id="titulo" class="card-title"></h5>
                <p id="mensaje" class="card-text"></p>
            </div>
        </div>
    </div>
</div>`;

socket.on('chat message', (msg) => {
    var item = document.createElement('div');
    item.innerHTML = post;
    item.querySelector('#mensaje').textContent = msg;
    listaMsg.appendChild(item);
});