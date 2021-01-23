const submit = document.querySelector('.submit');
const content = document.querySelector('.content');

const bookAuthor = document.getElementById('book-author');
const bookTitle = document.getElementById('book-title');
const bookPages = document.getElementById('book-pages');
const readStatus = document.getElementById('checkbox');
const myLibrary = [];

//book constructor
class Books {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    };
    //returns string with book information
    info() {
        return this.title + ', ' + this.author + ', ' + this.pages + ', ' + this.status;
    };
    changeReadStatus() {
        this.status === 'not read' ? this.status = 'read' : this.status = 'not read';
    }
};

//add books to content div
submit.addEventListener('click', () => {

    if (bookAuthor.value != '' && bookTitle.value != '' && bookPages.value != '' && !duplicateCheck()) {

        addBookToLibrary();
        createBooks();
    }
});

//exit on click & change read status
window.addEventListener('click', e => {
    e.stopPropagation();
    if (e.target.className === 'exit') {
        const indexOfRemoval = e.target.parentNode.dataset.attribute;
        myLibrary.splice(indexOfRemoval, 1);
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        createBooks();
    } else if (e.target.className === 'read-icon') {
        const indexOfStatus = e.target.parentNode.dataset.attribute;
        myLibrary[indexOfStatus].changeReadStatus();
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        };
        createBooks();

    }

})


//create book cards contained in divs
function createBooks() {
    // loop through each item on myLibrary array and create a card/div
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const paraTitle = document.createElement('h2');
        const paraAuthor = document.createElement('h3');
        const paraPages = document.createElement('h4');
        const exit = document.createElement('img');
        const readIcon = document.createElement('img');


        if (book.status === 'read') {
            readIcon.src = 'icons/book-sharp.svg'
        } else {
            readIcon.src = 'icons/book-outline.svg'
        }
        readIcon.classList.add('read-icon');

        exit.src = 'icons/trash-bin-outline.svg'
        exit.classList.add('exit');
        bookCard.appendChild(exit);
        bookCard.appendChild(readIcon);

        paraTitle.textContent = book.title;
        paraAuthor.textContent = book.author;
        paraPages.textContent = book.pages + ' pages';
        bookCard.appendChild(paraTitle);
        bookCard.appendChild(paraAuthor);
        bookCard.appendChild(paraPages);

        const title = (book.title).replace(/\s+/g, '');
        bookCard.classList.add(title);
        bookCard.classList.add('book');

        bookCard.setAttribute('data-attribute', index)


        appendToContent(bookCard);

    })
}

//duplicate checker for myLibrary array
function duplicateCheck() {
    return myLibrary.some(element => {
        return (element.title === bookTitle.value && element.author === bookAuthor.value && element.pages === bookPages.value);
    })
}
//check if book was already appended in content div
function appendToContent(bookCard) {
    const info = bookCard.textContent.replace(/\s+/g, '')
    const contentNodes = content.childNodes;
    const contentChildren = [];
    for (let i = 0; i < contentNodes.length; i++) {
        contentChildren[i] = contentNodes[i].textContent;
    };
    const contentChildren2 = contentChildren.join().replace(/\s+/g, '');


    if (!(contentChildren2.includes(info))) {
        content.appendChild(bookCard);
    }
}

function addBookToLibrary() {
    const book = new Books(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.value);
    myLibrary.push(book);

}
