// book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// create a prototype
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // create element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

// append to the list
  list.appendChild(row);
}

// show alert
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement('div');
  // add className
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');

  const form  = document.querySelector('#book-form');

  container.insertBefore(div, form);

  // timeout after 3sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// clear field
UI.prototype.clearFields = function() {
  document.getElementById('input').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// event listener for addbook
document.getElementById('book-form').addEventListener('submit', function(e) {
  // get form values
  const title = document.getElementById('input').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // instantiating a book
  const book = new Book(title, author, isbn);
  // console.log(book);

  // instantiate UI obj
  const ui = new UI();

  // validation
    if(title === '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add book to list
    ui.addBookToList(book);

    // show success message
    ui.showAlert('Book  Added', 'success');

    // clear field
    ui.clearFields();

  }

  // add book to list
  ui.addBookToList(book);

  // clear field
  ui.clearFields();

  e.preventDefault();
})

// event listener to delete an item
document.getElementById('book-list').addEventListener('click', function(e) {
  // instantiate UI obj
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // show alert once you delete
  ui.showAlert('Book Removed', 'success');


  e.preventDefault();
});
