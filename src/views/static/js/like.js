const url = "http://localhost:8080";

function like(link, id){
    fetch(url + '/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id
        })
    })
    .then( res => {
        link.classList.add('like-disabled');
        const icon = link.querySelector('i');
        icon.className = 'fas fa-thumbs-up text-success';
        console.log(res);
    })
    .catch( err => {
        console.error(err);
    });
}