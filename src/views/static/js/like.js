const url = "http://localhost:8080";

function like(id){
    console.log(id)
    fetch(url + '/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id
        })
    })
    .then( res => {
        console.log(res);
    })
    .catch( err => {
        console.error(err);
    });
}