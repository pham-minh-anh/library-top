const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor")
        }
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }

    toggleRead() {this.read = !this.read;}

    static addBookToLibrary (title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    }

    static displayBooks () {
        const table = document.querySelector("table");
        for (let book of myLibrary) {
            const row = document.createElement("tr");
            for (let property in book) {
                if (typeof book[property] === "function" || property === "id") {}
                else if (property ==="read") {
                    const readButton = document.createElement("button")
                    readButton.className = "read";
                    if(book.read) {
                        readButton.textContent = "read";
                    } else {
                        readButton.textContent = "notread";
                    }
                    readButton.setAttribute("data-index-number", book.id)
                    row.appendChild(readButton)

                    readButton.addEventListener("click", function(event) {
                        const target = event.target;
                        const id = target.dataset.indexNumber;
                        const targetBook = myLibrary.find(book => book.id === id);
                        targetBook.toggleRead();

                        Book.clearTable();
                        Book.displayBooks();

                    })
                }
                else {
                    const cell = document.createElement("td");
                    cell.textContent = book[property];
                    row.appendChild(cell);
                }
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

                Book.clearTable();
                Book.displayBooks();
            })

            table.appendChild(row);
        }
    }

    static clearTable() {
        const table = document.querySelector("table");
        const rows = document.querySelectorAll('tr:not(:first-child)');
        for (let row of rows) {
            table.removeChild(row);
        }
    }
}

Book.addBookToLibrary("Haha", "Mem", 300, true);
Book.addBookToLibrary("Hihi", "Hoho", 400, false);

Book.displayBooks()

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

    Book.addBookToLibrary(name.value, author.value, pages.value, read.checked);

    name.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;

    dialog.close();
    
    Book.clearTable();
    Book.displayBooks();
})

const removeButtons = document.querySelectorAll(".remove");