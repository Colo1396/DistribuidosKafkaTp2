const api_url = "http://localhost:8080";

function seguirUsuario(followId){
    fetch(api_url + '/seguirUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            followId: followId
        })
    })
    .then( res => {
        console.log(res);
    })
    .catch( err => {
        console.error(err);
    });
}