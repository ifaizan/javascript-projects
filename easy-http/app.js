const http = new easyHttp();

// http.get('https://jsonplaceholder.typicode.com/posts', function(err, posts) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(posts);
//     }
// });

const data = {
    title: 'New Post',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit non porro praesentium rem ipsa. Reprehenderit voluptatum consequatur deleniti repudiandae nisi perspiciatis laborum praesentium, magni cum veritatis deserunt quaerat. Molestiae, nostrum?'
}

// http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, posts) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(posts);
//     }
// });


// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, posts) {

//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(posts);
//     }
// });

http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, posts) {

    if (err) {
        console.log(err);
    }
    else {
        console.log(posts);
    }
});