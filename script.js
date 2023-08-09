/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const bookForm = document.getElementById('book-entry');
const bookStore = document.getElementById('bookStore');

class BookObj {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class BookLibrary {
  constructor() {
    this.bookShelf = this.theShelf();
  }

  addBook(title, author) {
    const newBook = new BookObj(title, author);
    this.bookShelf.push(newBook);
    this.saveBooksToLocalStorage();
  }

  removeBook(index) {
    this.bookShelf.splice(index, 1);
    this.saveBooksToLocalStorage();
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.bookShelf));
  }

  theShelf() {
    const shelfBook = JSON.parse(localStorage.getItem('books')) || [];
    return shelfBook;
  }
}

const lastBook = new BookLibrary();

function generateBooks() {
  bookStore.innerHTML = '';
  for (let i = 0; i < lastBook.theShelf().length; i += 1) {
    const divElement = document.createElement('div');
    divElement.className = 'reader';
    const book = lastBook.theShelf()[i];
    divElement.innerHTML = `
          <p class='book-title'>${book.name} by ${book.author}</p>
          <button onclick='removeBook(${i})'>Remove</button>
      `;
    bookStore.appendChild(divElement);
  }
}

function addBook() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#Author').value;
  const book = new BookObj(title, author);
  lastBook.addBook(title, author);
  generateBooks();
}

function removeBook(index) {
  lastBook.removeBook(index);
  generateBooks();
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
});

window.addEventListener('load', generateBooks);
