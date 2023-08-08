const bookShelf = [];
const bookForm = document.getElementById('book-entry');
const bookStore = document.getElementById('bookStore');
const bookName = document.querySelector('.book-title');
const bookAuthor = document.querySelector('books-author');
const btn = document.getElementById('new-book'); 

function bookObj(name, author) {
    this.name = name;
    this.author = author;
}

function generateBooks() {
    bookStore.innerHTML = '';
    for(let i = 0; i < bookShelf.length; i++) {
        const divElement = document.createElement('div');
        divElement.className = 'reader';
        const book = bookShelf[i];
        divElement.innerHTML = `
            <p class='book-title'>${book.name}</p>
            <p class='books-author'>${book.author}</p>
            <button onclick='removeBook(${i})'>Remove</button>
        `;
        bookStore.appendChild(divElement);
    }
}

function addBook() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#Author').value;
    let book = new bookObj(title, author);
    bookShelf.push(book);
    generateBooks();
}
function removeBook(index) {
    bookShelf.splice(index, 1);
    generateBooks();
}