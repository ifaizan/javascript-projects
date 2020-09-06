const http = new EasyHTTP;

const data = {
    "title": "This is a post",
    "username": "John doe",
    "email": "jdoe@gmail.com"
}

// http.get('https://jsonplaceholder.typicode.com/users')
// .then(user => console.log(user))
// .catch(err => console.log(err));

// http.post('https://jsonplaceholder.typicode.com/users', data)
// .then(user => console.log(user))
// .catch(err => console.log(err));

// http.put('https://jsonplaceholder.typicode.com/users/6', data)
// .then(user => console.log(user))
// .catch(err => console.log(err));

http.delete('https://jsonplaceholder.typicode.com/users/6', data)
.then(user => console.log(user))
.catch(err => console.log(err));