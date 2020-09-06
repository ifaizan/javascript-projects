document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    const number = document.getElementById('number').value;
    // console.log(number.value);

    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function() {
        if (this.status === 200) {
            const objects = JSON.parse(this.responseText);

            let output = '';
    
            if (objects.type === 'success') {
                objects.value.forEach(function(object) {
                    output += `<li>${object.joke}</li>`
                })
            } else {
                output += `<li>Something went wrong</li>`
            }

            document.querySelector('.jokes').innerHTML = output;
        }
    }

    xhr.send();

    e.preventDefault();
}