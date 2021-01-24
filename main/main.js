const submit = document.querySelector('.submit input');
const content = document.querySelector('.content');
const information = document.querySelector('.stats');
const sideBar = document.querySelector('.side-bar');

const bookAuthor = document.getElementById('book-author');
const bookTitle = document.getElementById('book-title');
const bookPages = document.getElementById('book-pages');
const readStatus = document.querySelector('.read-status');
const myLibrary = (retrieveMyLibrary() === null) ? [] : retrieveMyLibrary();
createBooks();
update();

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
        if (myLibrary.length === 0) {
            localStorage.clear();
        }
    } else if (e.target.className === 'read-icon') {
        const indexOfStatus = e.target.parentNode.dataset.attribute;
        changeReadStatus(indexOfStatus);
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        };
        createBooks();

    } else if (e.target.className === 'read-status') {
        e.stopPropagation();
        if (e.target.dataset.status === 'not read') {
            e.target.src = 'icons/book-sharp.svg';
            e.target.dataset.status = 'read';
        } else if (e.target.dataset.status === 'read') {
            e.target.src = 'icons/book-outline.svg';
            e.target.dataset.status = 'not read';
        }
    }
    //update information box
    update();
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
            readIcon.src = 'icons/book-sharp.svg';
        } else {
            readIcon.src = 'icons/book-outline.svg';
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
        //store data in localStorage
        storeMyLibrary();

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

//change read status
function changeReadStatus(indexOfStatus) {
    myLibrary[indexOfStatus].status === 'not read' ? myLibrary[indexOfStatus].status = 'read' : myLibrary[indexOfStatus].status = 'not read';
}

function addBookToLibrary() {
    const book = new Books(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.dataset.status);
    myLibrary.push(book);

}
//update info box
function update(){
    //information counter
       const bookCount = myLibrary.length;
       const counter = 0;
       const completedBooks = myLibrary.reduce((total, comparison) => {
   
           if (comparison.status === 'read') {
               return total + 1;
           } else {
               return total + 0;
           }
       }, 0);
       const percentCompleted = ((Number(completedBooks) / Number(bookCount) * 100)).toFixed(2) + '%';
   
   //update text info box
   document.querySelector('.book-count').textContent = bookCount;
   document.querySelector('.book-complete').textContent = completedBooks;
   document.querySelector('.book-percent').textContent = (percentCompleted === 'NaN%') ? '0%' : percentCompleted;
   
   
   
   }

//enable local storage of objects and arrays
function storeMyLibrary() {
    localStorage.setItem('Library', JSON.stringify(myLibrary));
}

function retrieveMyLibrary() {
    return JSON.parse(localStorage.getItem('Library'));
};

//shows and hides side-bar on mobile
window.addEventListener('click', e => {
    e.stopPropagation();
    console.log(e.target.classList);
    if (e.target.classList.contains('hamburger')){
        showPopup();
    }
})
function showPopup() {
  sideBar.classList.toggle("show");
}