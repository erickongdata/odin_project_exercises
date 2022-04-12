const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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
    title.textContent = library[i].title;
    author.textContent = library[i].author;
    pages.textContent = "Pages: " + library[i].pages;
    closeBtn.setAttribute("type", "button");
    closeBtn.textContent = "X";
    closeBtn.dataset.index = i;
    closeBtn.addEventListener("click", deleteBook);
    card.append(title, author, pages, closeBtn);
    card.classList.add("card");
    container.append(card);
  }
  body.append(container);
  container.classList.add("container");
  container.setAttribute(
    "style",
    "display: grid; grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr)); gap: 3ch;"
  );
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.setAttribute("style", "border: 1px solid black; padding: 0.5em; background-color: lightyellow;")
  );
  newBookBtn();
}

function newBookBtn() {
  const body = document.body;
  const btn = document.createElement("button");
  btn.textContent = "NEW BOOK";
  btn.classList.add("new-book-btn");
  btn.style.margin = "2rem .5rem";
  btn.style.fontSize = "1.5rem";
  btn.addEventListener("click", newBookForm);
  body.append(btn);
}

function newBookForm() {
  const body = document.body;
  const newBookBtn = document.querySelector(".new-book-btn");
  newBookBtn.remove();
  const form = document.createElement("form");
  const title = document.createElement("input");
  const author = document.createElement("input");
  const pages = document.createElement("input");
  const inputs = [title, author, pages];
  const labels = ["Title", "Author", "Pages"];
  for (let i = 0; i < 3; i++) {
    inputs[i].setAttribute("style", "display: block;");
    inputs[i].classList.add("new-book-" + labels[i].toLowerCase());
    form.append(labels[i], inputs[i]);
  }
  title.type = "text";
  author.type = "text";
  pages.type = "number";
  const submit = document.createElement("button");
  const cancel = document.createElement("button");
  submit.setAttribute("type", "button");
  cancel.setAttribute("type", "button");
  submit.textContent = "Submit";
  cancel.textContent = "Cancel";
  submit.id = "new-book-submit";
  cancel.id = "new-book-cancel";
  submit.addEventListener("click", newBookSubmit);
  cancel.addEventListener("click", newBookCancel);
  form.append(submit, cancel);
  form.id = "new-book-form";
  form.setAttribute("style", "margin: 2rem auto; padding: 0.5rem; border: 1px solid black;");
  body.append(form);
}

function newBookSubmit() {
  const container = document.querySelector(".container");
  const form = document.querySelector("#new-book-form");
  const title = document.querySelector(".new-book-title");
  const author = document.querySelector(".new-book-author");
  const pages = document.querySelector(".new-book-pages");
  const book = new Book(title.value, author.value, pages.value);
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
  container.remove();
  newBookBtn.remove();
  displayBooks(myLibrary);
}

addBookToLibrary(new Book("Finding Saul", "Saul Leiter", 190));
addBookToLibrary(new Book("LOTR", "J. R. R. Tolkien", 1098));
displayBooks(myLibrary);
