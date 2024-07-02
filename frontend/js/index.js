document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const loadMoreBtn = document.getElementById('load-more');
  const loginBtn = document.getElementById('login-btn');
  let offset = 0;
  const limit = 20;

  const loadBooks = (query = '') => {
    fetch(`/books?offset=${offset}&limit=${limit}&query=${query}`)
      .then(response => response.json())
      .then(books => {
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';
        books.forEach(book => {
          const bookItem = document.createElement('div');
          bookItem.textContent = `${book.title} - ${book.author}`;
          booksList.appendChild(bookItem);
        });
      });
  };

  searchBtn.addEventListener('click', () => {
      const query = document.getElementById('search').value;
      offset = 0; // Reset the offset for a new search query
      loadBooks(query);
  });
    
  loadMoreBtn.addEventListener('click', () => {
      offset += limit;
      const query = document.getElementById('search').value;
      loadBooks(query);
  });
    
  // Añadir evento de clic al botón de inicio de sesión
  loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
  });

  // Initial load of books
  loadBooks();
});