class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='delete-item'>X</a></td>
        `
        list.appendChild(row);
    }

    showAlerts(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message));
    
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        container.insertBefore(div, form);
    
        setTimeout(function(target) {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete-item') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') == null) {
            books = [];
        }

        else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui = new UI();
            ui.addBookToList(book);
        })

    }

    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks());

document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //Create a book object
    const book = new Book(title, author, isbn);

    //Create a UI object
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlerts('Please enter the required fields', 'error');
    }

    else {
        ui.addBookToList(book);

        Store.addBooks(book);

        ui.clearFields(book);
        ui.showAlerts('Book added Successfully!', 'success');
    }

    e.preventDefault();
})

// Event listener to remove books from the list
document.getElementById('book-list').addEventListener('click', function(e) {
    //Create a UI object
    const ui = new UI();

    ui.deleteBook(e.target);
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlerts('Book removed', 'success');

    e.preventDefault();
});