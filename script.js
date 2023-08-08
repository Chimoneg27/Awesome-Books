/* eslint-disable new-cap */
const bookShelf = [];
const bookForm = document.getElementById('book-entry');
const bookStore = document.getElementById('bookStore');

function bookObj(name, author) {
  this.name = name;
  this.author = author;
}

function generateBooks() {
  bookStore.innerHTML = '';
  for (let i = 0; i < bookShelf.length; i += 1) {
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
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#Author').value;
  const book = new bookObj(title, author);
  bookShelf.push(book);
  generateBooks();
}

function removeBook(index) {
  bookShelf.splice(index, 1);
  generateBooks();
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
});

addBook();
removeBook();