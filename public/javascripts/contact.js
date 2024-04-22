let form = document.getElementById('formulaire');
let email = document.getElementById('email');


form.addEventListener("submit", function(event) {
    event.preventDefault();
    alert('soumis');
    
    fetch('/soumis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: email.value })
        }
    ).then(response => {
        console.log(response);
        if(response.status != 200) {
            throw ("Error while sending the email: " + response.status);
        }
        else {
            window.location.href = "/soumission";
        }
    })
    .catch(error => {
        console.log(error);
        window.location.href = "/fail";
    });
});