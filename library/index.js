const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get readStatus() {
    return this.read;
  }
  set readStatus(status) {
    this.read = status;
  }
}

function addBookToLibrary(book) {
  return myLibrary.push(book);
}

function displayBooks(library) {
  const body = document.body;
  const container = document.createElement("div");
  for (let i in library) {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const closeBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    title.textContent = library[i].title;
    author.textContent = library[i].author;
    pages.textContent = "Pages: " + library[i].pages;
    // Close Button
    closeBtn.setAttribute("type", "button");
    closeBtn.textContent = "X";
    closeBtn.dataset.index = i;
    closeBtn.addEventListener("click", deleteBook);
    // Read Button
    readBtn.setAttribute("type", "button");
    readBtn.textContent = library[i].read;
    readBtn.dataset.index = i;
    readBtn.addEventListener("click", toggleRead);

    card.append(title, author, pages, closeBtn, readBtn);
    card.classList.add("card");
    container.append(card);
  }
  body.append(container);
  container.classList.add("container");
  newBookBtn();
}

function newBookBtn() {
  const body = document.body;
  const btn = document.createElement("button");
  btn.textContent = "NEW BOOK";
  btn.classList.add("new-book-btn");
  btn.addEventListener("click", newBookForm);
  body.append(btn);
}

function newBookForm() {
  const body = document.body;
  // Remove New Book Button when pressed
  const newBookBtn = document.querySelector(".new-book-btn");
  newBookBtn.remove();
  // Add form inputs
  const form = document.createElement("form");
  const title = document.createElement("input");
  const author = document.createElement("input");
  const pages = document.createElement("input");
  const inputs = [title, author, pages];
  const labels = ["Title", "Author", "Pages"];
  for (let i = 0; i < 3; i++) {
    inputs[i].classList.add("new-book-" + labels[i].toLowerCase());
    form.append(labels[i], inputs[i]);
  }
  title.type = "text";
  author.type = "text";
  pages.type = "number";
  // Submit Button
  const submit = document.createElement("button");
  submit.type = "button";
  submit.textContent = "Submit";
  submit.id = "new-book-submit";
  submit.addEventListener("click", newBookSubmit);
  // Cancel Button
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Cancel";
  cancel.id = "new-book-cancel";
  cancel.addEventListener("click", newBookCancel);

  form.append(submit, cancel);
  form.id = "new-book-form";
  body.append(form);
}

function newBookSubmit() {
  const container = document.querySelector(".container");
  const form = document.querySelector("#new-book-form");
  const title = document.querySelector(".new-book-title");
  const author = document.querySelector(".new-book-author");
  const pages = document.querySelector(".new-book-pages");
  const book = new Book(title.value, author.value, pages.value, "unread");
  if (title.value) {
    addBookToLibrary(book);
    form.remove();
    container.remove();
    displayBooks(myLibrary);
  }
}

function newBookCancel() {
  const form = document.querySelector("#new-book-form");
  form.remove();
  newBookBtn();
}

function deleteBook() {
  const container = document.querySelector(".container");
  const newBookBtn = document.querySelector(".new-book-btn");
  const index = this.dataset.index;
  myLibrary.splice(index, 1);
  // Refresh library
  container.remove();
  newBookBtn.remove();
  displayBooks(myLibrary);
}

function toggleRead() {
  const container = document.querySelector(".container");
  const newBookBtn = document.querySelector(".new-book-btn");
  const index = this.dataset.index;
  if (myLibrary[index].readStatus == "unread") {
    myLibrary[index].readStatus = "read";
  } else {
    myLibrary[index].readStatus = "unread";
  }
  // Refresh library
  container.remove();
  newBookBtn.remove();
  displayBooks(myLibrary);
}

addBookToLibrary(new Book("Finding Saul", "Saul Leiter", 190, "unread"));
addBookToLibrary(new Book("LOTR", "J. R. R. Tolkien", 1098, "read"));
displayBooks(myLibrary);
