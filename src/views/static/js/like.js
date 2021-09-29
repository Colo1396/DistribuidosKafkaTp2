const url = "http://localhost:8080";

function like(userId){
    console.log(userId)
    fetch(url + '/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then( res => {
        console.log(res);
    })
    .catch( err => {
        console.error(err);
    });
}