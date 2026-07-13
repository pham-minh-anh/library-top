const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const table = document.querySelector("table");
    for (let book of myLibrary) {
        const row = document.createElement("tr");
        for (let property in book) {
            if (typeof book[property] === "function" || property === "id") continue;
            const cell = document.createElement("td");
            cell.textContent = book[property];
            row.appendChild(cell);
        }

        const removeButton = document.createElement("button")
        removeButton.className = "remove";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-index-number", book.id)
        row.appendChild(removeButton)

        removeButton.addEventListener("click", function(event) {
        const target = event.target;
        const id = target.dataset.indexNumber;
        const index = myLibrary.findIndex(book => book.id === id);
        
        myLibrary.splice(index, 1);

        clearTable();
        displayBooks();
    })

        table.appendChild(row);
    }
}

function clearTable() {
    const table = document.querySelector("table");
    const rows = document.querySelectorAll('tr:not(:first-child)');
    for (let row of rows) {
        table.removeChild(row);
    }
}

addBookToLibrary("Haha", "Mem", 300, true);
addBookToLibrary("Hihi", "Hoho", 400, false);

displayBooks()

const addButton = document.querySelector("button.add")
const dialog = document.querySelector("dialog")
const submitButton = document.querySelector("button.submit")

addButton.addEventListener("click", function() {
    dialog.showModal();
})

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    const name = document.querySelector("#name");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");

    addBookToLibrary(name.value, author.value, pages.value, read.checked);

    name.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    dialog.close();
    
    clearTable();
    displayBooks();
})

const removeButtons = document.querySelectorAll(".remove");