function Book(title, author, pageNum, read) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.read = read;


  Book.prototype.info = function() {
    let readString;
    if (this.read) {
      readString = 'read';
    } else {
      readString = 'not yet read';
    }
    return (title + ' by ' + author + ', ' + pageNum + ' pages, ' + readString);
  }

  Book.prototype.readYet = function() {
    if (this.read) {
      return 'Read';
    } else {
      return 'Not Read';
    }
  }
};

function addBookToLibrary(library, book) {
  library.push(book);
  return library;
}

function createBookDiv(book) {
  let bookDiv = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let pages = document.createElement('p');
  let readYet = document.createElement('p');

  bookDiv.className = 'book-grid-item';
  title.textContent = book.title;
  title.id = 'title';
  author.textContent = book.author;
  author.id = 'author';
  pages.textContent = 'Pages: ' + book.pageNum;
  pages.id = 'pages'
  readYet.textContent = book.readYet();
  readYet.id = 'read';

  bookDiv.appendChild(title);
  bookDiv.appendChild(author);
  bookDiv.appendChild(pages);
  bookDiv.appendChild(readYet);

  return bookDiv;
}

function formSubmit() {
  let form = document.getElementById('newBook');

  title = form.elements[0].value;
  author = form.elements[1].value;
  pages = form.elements[2].value;
  readStatus = form.elements[3].checked;

  let newBook = new Book(title, author, pages, readStatus);
  mainDiv.appendChild(createBookDiv(newBook));
  formDiv.classList.toggle('hide');

  addMode = false;
}

function populateLibrary(library) {
  for (i = 0; i < library.length; i++) {
    let book = createBookDiv(library[i]);
    mainDiv.appendChild(book);
  }
}

function reset(library) {
  let books = document.querySelectorAll('.book-grid-item');
  for (let i = 0; i < books.length; i++) {
    mainDiv.removeChild(books[i]);
  }
}

let addMode = false;
let formDiv = document.querySelector('.book-form');
let mainDiv = document.querySelector('.book-grid');
const testBook = new Book("The Way of Kings", "Brandon Sanderon", 1207, true);
let myLibrary = [testBook];
populateLibrary(myLibrary);

resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', (e) => {
  if (!addMode) {
    reset(myLibrary);
  }
});

addBtn = document.querySelector('.addBook');
addBtn.addEventListener('click', (e) => {
  formDiv.classList.toggle('hide');
  addMode = true;
});
