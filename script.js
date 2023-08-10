/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const bookForm = document.getElementById('book-entry');
const bookStore = document.getElementById('bookStore');
const listClick = document.querySelector('#list');
const addClick = document.querySelector('#add-book');
const contactClick = document.querySelector('#contact-details');
const storeTitle = document.querySelector('#store-title');
const contacts = document.querySelector('#contact-box');
const dateBox = document.querySelector('#dates');
const currentDate = new Date(2023, 7, 10, 16, 55);
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

dateBox.innerHTML = `
  <p>${currentDate}</p>
`;

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

function showForm() {
  if (bookStore.style.display === 'block') {
    bookStore.style.display = 'none';
    storeTitle.style.display = 'none';
    contacts.style.display = 'none';
  } else if (contacts.style.display) {
    contacts.style.display = 'none';
  }
  bookForm.style.display = 'flex';
}

function showShelf() {
  if (bookForm.style.display === 'flex') {
    bookForm.style.display = 'none';
  }
  contacts.style.display = 'none';
  bookStore.style.display = 'block';
  storeTitle.style.display = 'block';
}

function contactUs() {
  if (bookStore.style.display === 'block') {
    bookStore.style.display = 'none';
    storeTitle.style.display = 'none';
  }
  bookForm.style.display = 'none';
  contacts.style.display = 'block';
}

contactClick.addEventListener('click', contactUs);
addClick.addEventListener('click', showForm);
listClick.addEventListener('click', showShelf);