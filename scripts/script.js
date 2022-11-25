// BOOK CONSTRUCTOR

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = false;
    }
}

// GET USER DATA FROM FORM
let myLibrary = [];

function addBookToLibrary(e) {
    e.preventDefault();
    const form = document.getElementById("form-container");
    let formData = new FormData(form);
    const book = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("isRead"));
    myLibrary.push(book);
    closeForm();

    document.querySelectorAll("input").forEach(function (element) {
        element.value = "";
    });
    const booksList = document.querySelector(".books-list-container");
    booksList.style.display = "block";
    displayBooks();
}

// DISPLAY LIBRARY BOOKS

function displayBooks() {
    const bookList = document.querySelector('#table-body');
    bookList.textContent = '';
    for (const [index, bookInLibrary] of myLibrary.entries()) {
        let bookRow = document.createElement('tr');
        bookList.appendChild(bookRow);
        // BOOK TITLE
        let bookTitle = document.createElement('td');
        bookTitle.textContent = bookInLibrary.title;
        bookTitle.classList.add("book-row-title");
        bookTitle.classList.add("first-child")
        bookRow.appendChild(bookTitle);
        // BOOK AUTHOR
        let bookAuthor = document.createElement('td');
        bookAuthor.textContent = bookInLibrary.author;
        bookAuthor.classList.add("book-row-author");
        bookRow.appendChild(bookAuthor);
        // BOOK PAGES
        let bookPages = document.createElement('td');
        bookPages.textContent = bookInLibrary.pages;
        bookPages.classList.add("book-row-pages");
        bookRow.appendChild(bookPages);
        // BOOK ISREAD
        let bookStatus = document.createElement('td');
        if (bookInLibrary.isRead === false) {
            bookStatus.textContent = "Not Read Yet";
        } else {
            bookStatus.textContent = "Is Read";;
        }
        bookStatus.classList.add("book-row-status");
        bookRow.appendChild(bookStatus);

        // REMOVE BUTTON
        const removeCell = document.createElement('td');
        removeCell.classList.add("last-child");

        const bookRemoveButton = document.createElement("button");
        bookRemoveButton.textContent = "Remove";
        bookRemoveButton.classList.add("bookRemove-button");
        bookRemoveButton.setAttribute('onclick', `deleteRow(${index})`);

        removeCell.appendChild(bookRemoveButton);
        bookRow.appendChild(removeCell);
    }
}

function deleteRow(index) {
    console.log(index)
    myLibrary.splice(index, 1);
    displayBooks();
}

// MODEL
const modal = document.querySelector(".modal")
const openFormButton = document.getElementById("openForm-button");
const closeFormButton = document.getElementById("closeForm-button");
const submitFormButton = document.getElementById("submitForm-button");

openFormButton.addEventListener("click", openForm);

function openForm() {
    modal.style.display = "block";
}

closeFormButton.addEventListener("click", closeForm);

function closeForm() {
    modal.style.display = "none";
}

submitFormButton.addEventListener("click", addBookToLibrary);

