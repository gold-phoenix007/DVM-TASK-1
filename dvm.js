// dvm.js
const url = 'https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=25&page=1';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2d5c39015cmsh2605c35aafe324dp164409jsn5b516b2c32d5',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    }
};
const bookListElement = document.getElementById('bookList');
const searchInputElement = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const toggleViewButton = document.getElementById('toggleView');

let books = [];
let favorites = [];

async function fetchBooksData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        books = data.results;
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooks(booksToDisplay) {
    bookListElement.innerHTML = '';
    booksToDisplay.forEach(book => {
        const bookElement = createBookElement(book);
        bookListElement.appendChild(bookElement);
    });
}

function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author_first_names}</p>
        <p>Series: ${book.series_name}</p>
        <p>Type: ${book.book_type}</p>
        <button onclick="toggleFavorite(${book.id})" class="${favorites.includes(book.id) ? 'favorite' : ''}">
            ${favorites.includes(book.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    `;
    return bookElement;
    function toggleFavorite(bookId) {
        const index = favorites.indexOf(bookId);
        if (index === -1) {
            favorites.push(bookId);
        } else {
            favorites.splice(index, 1);
        }
        displayBooks(books);
    }
}

function searchBooks() {
    const searchTerm = searchInputElement.value.trim().toLowerCase();
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchTerm) || 
               book.author_first_names.toLowerCase().includes(searchTerm);
    });
    displayBooks(filteredBooks);
}



function toggleView() {
    const filteredBooks = books.filter(book => favorites.includes(book.id));
    displayBooks(filteredBooks);
    toggleViewButton.textContent = toggleViewButton.textContent === 'View All Books' ? 'View Favorites' : 'View All Books';
}

// Add event listeners
searchButton.addEventListener('click', searchBooks);
toggleViewButton.addEventListener('click', toggleView);
searchInputElement.addEventListener('input', searchBooks);

fetchBooksData();




















