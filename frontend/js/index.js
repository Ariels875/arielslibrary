document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');
  const loadMoreBtn = document.getElementById('load-more');
  const loginBtn = document.getElementById('login-btn');
  let offset = 0;
  const limit = 20;

  const loadBooks = (query = '') => {
    fetch(`/books?offset=${offset}&limit=${limit}&query=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(books => {
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';
        books.forEach(book => {
          const bookItem = document.createElement('div');
          bookItem.classList.add('book-item');
  
          const imgContainer = document.createElement('div');
          imgContainer.classList.add('book-img-container');
          const img = document.createElement('img');
          img.src = book.URLPortada;
          img.alt = book.Titulo;
          imgContainer.appendChild(img);
          bookItem.appendChild(imgContainer);
  
          const info = document.createElement('div');
          info.classList.add('book-info');
  
          const title = document.createElement('h3');
          title.textContent = book.Titulo;
          info.appendChild(title);
  
          const year = document.createElement('p');
          year.textContent = `Año de publicación: ${book.Anio_publicacion}`;
          info.appendChild(year);
  
          const genre = document.createElement('p');
          genre.textContent = `Género: ${book.Genero}`;
          info.appendChild(genre);
  
          const description = document.createElement('p');
          description.textContent = book.Descripcion;
          info.appendChild(description);
  
          bookItem.appendChild(info);
          booksList.appendChild(bookItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al cargar los libros');
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