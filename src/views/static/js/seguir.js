const api_url = "http://localhost:8080";

function seguirUsuario(button, followId){
    fetch(api_url + '/seguirUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            followId: followId
        })
    })
    .then( res => {
        button.className = 'btn btn-danger';
        button.innerHTML = 'Siguiendo';
        button.disabled = true;
    })
    .catch( err => {
        console.error(err);
    });
}