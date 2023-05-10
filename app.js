let myLibrary = [];



// Save in localstorage
const saveLocal = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary))
}


// Get from localstorage

  window.onload = function () {
  const books = JSON.parse(localStorage.getItem('library'));
  if (books) {
    myLibrary = books.map((newBook) => JSONToBook(newBook));
    // if(myLibrary.length === 0){
    //   let newBook = new Book("Luceafarul", "Mihai Eminescu", "245", true);
    //   myLibrary.push(newBook);
    // }
    render();
  } else {
    myLibrary = [];
  }
}



function JSONToBook(bookJson){

  return new Book(bookJson.title, bookJson.author, bookJson.pages, bookJson.read);
  
}


function Book (title, author, pages, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}


function toggleRead(index) {
  myLibrary[index].toggleRead();
  saveLocal();
  render();
}


function removeBook(index) {
  myLibrary.splice(index, 1);
  saveLocal();
  render();
}




function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];
      let bookEl = document.createElement("div");
      bookEl.setAttribute("class", "book-card");
      bookEl.innerHTML = `
        <div class="card-header">
          <h3 class="title">${book.title}</h3>
          <h5 class="author">by ${book.author}</h5>
        </div>

        <div class="card-body">
          <p>${book.pages} pages</p>
          <p class="read-status">${book.read ? "Read" : "Not Read Yet"}</p>
          <div class="card-body-btn"> 
          <button  id="read-btn" class=${book.read ? "toggle-read-btn-unread" : "toggle-read-btn"} onclick="toggleRead(${i})"> ${book.read ? "Unread" : "Read"}</button>
          <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
          </div> 
        </div>
      `;
      libraryEl.appendChild(bookEl);
    }}

   

    function addBookToLibrary() {

      let title = document.querySelector("#title").value;
      let author = document.querySelector("#author").value;
      let pages = document.querySelector("#pages").value;
      let read = document.querySelector("#read").checked;

      let newBook = new Book(title, author, pages, read);
      myLibrary.push(newBook);
      render();
      saveLocal();
      }


    let newBookBtn = document.querySelector("#new-book-btn");
    let newBookForm = document.querySelector("#new-book-form");
    newBookBtn.addEventListener("click", () => {

    if ( newBookForm.style.display === "none"){
        newBookBtn.setAttribute("class", "close-form");
        newBookForm.style.display = "block"
        newBookBtn.textContent = "Close"
    }else {
        newBookBtn.setAttribute("class", "open-form");
        newBookForm.style.display = "none";
        newBookBtn.textContent = "Add book"
    }});



    document.querySelector("#new-book-form").addEventListener("submit", function(event) {
      event.preventDefault();
      addBookToLibrary();
      render();
    });





