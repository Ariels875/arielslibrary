document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const authorForm = document.getElementById('author-form');
    const userForm = document.getElementById('user-form');
    const loanForm = document.getElementById('loan-form');
    const backupsList = document.getElementById('backups-list');
    const searchType = document.getElementById('search-type');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
  
    const displayForm = (formId) => {
      const forms = [bookForm, authorForm, userForm, loanForm];
      forms.forEach(form => {
        form.style.display = form.id === formId ? 'block' : 'none';
      });
    };
  
    // Books
    document.getElementById('add-book').addEventListener('click', () => {
      bookForm.reset();
      document.getElementById('book-id').value = '';
      displayForm('book-form');
    });
  
    document.getElementById('edit-book').addEventListener('click', async () => {
      const bookId = prompt('Ingrese el ID del libro a editar:');
      if (bookId) {
        try {
          const response = await fetch(`/books/${bookId}`);
          const book = await response.json();
          document.getElementById('book-id').value = book.id;
          document.getElementById('book-title').value = book.title;
          document.getElementById('book-author').value = book.author;
          document.getElementById('book-year').value = book.year;
          displayForm('book-form');
        } catch (error) {
          console.error('Error fetching book:', error);
          alert('Error al obtener el libro');
        }
      }
    });
  
    document.getElementById('delete-book').addEventListener('click', async () => {
      const bookId = prompt('Ingrese el ID del libro a eliminar:');
      if (bookId) {
        try {
          const response = await fetch(`/books/${bookId}`, { method: 'DELETE' });
          if (response.ok) {
            alert('Libro eliminado con éxito');
          } else {
            alert('Error al eliminar el libro');
          }
        } catch (error) {
          console.error('Error deleting book:', error);
          alert('Error al eliminar el libro');
        }
      }
    });
  
    bookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bookId = document.getElementById('book-id').value;
      const bookData = {
        title: document.getElementById('book-title').value,
        author: document.getElementById('book-author').value,
        year: document.getElementById('book-year').value
      };
      try {
        const method = bookId ? 'PUT' : 'POST';
        const url = bookId ? `/books/${bookId}` : '/books';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
        });
        if (response.ok) {
          alert(bookId ? 'Libro actualizado con éxito' : 'Libro agregado con éxito');
          bookForm.reset();
          displayForm('');
        } else {
          alert('Error al guardar el libro');
        }
      } catch (error) {
        console.error('Error saving book:', error);
        alert('Error al guardar el libro');
      }
    });
  
    // Authors
    document.getElementById('add-author').addEventListener('click', () => {
      authorForm.reset();
      document.getElementById('author-id').value = '';
      displayForm('author-form');
    });
  
    document.getElementById('edit-author').addEventListener('click', async () => {
      const authorId = prompt('Ingrese el ID del autor a editar:');
      if (authorId) {
        try {
          const response = await fetch(`/authors/${authorId}`);
          const author = await response.json();
          document.getElementById('author-id').value = author.id;
          document.getElementById('author-name').value = author.name;
          document.getElementById('author-country').value = author.country;
          displayForm('author-form');
        } catch (error) {
          console.error('Error fetching author:', error);
          alert('Error al obtener el autor');
        }
      }
    });
  
    document.getElementById('delete-author').addEventListener('click', async () => {
      const authorId = prompt('Ingrese el ID del autor a eliminar:');
      if (authorId) {
        try {
          const response = await fetch(`/authors/${authorId}`, { method: 'DELETE' });
          if (response.ok) {
            alert('Autor eliminado con éxito');
          } else {
            alert('Error al eliminar el autor');
          }
        } catch (error) {
          console.error('Error deleting author:', error);
          alert('Error al eliminar el autor');
        }
      }
    });
  
    authorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const authorId = document.getElementById('author-id').value;
      const authorData = {
        name: document.getElementById('author-name').value,
        country: document.getElementById('author-country').value
      };
      try {
        const method = authorId ? 'PUT' : 'POST';
        const url = authorId ? `/authors/${authorId}` : '/authors';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authorData)
        });
        if (response.ok) {
          alert(authorId ? 'Autor actualizado con éxito' : 'Autor agregado con éxito');
          authorForm.reset();
          displayForm('');
        } else {
          alert('Error al guardar el autor');
        }
      } catch (error) {
        console.error('Error saving author:', error);
        alert('Error al guardar el autor');
      }
    });
  
    // Users
    document.getElementById('add-user').addEventListener('click', () => {
      userForm.reset();
      document.getElementById('user-id').value = '';
      displayForm('user-form');
    });
  
    document.getElementById('edit-user').addEventListener('click', async () => {
      const userId = prompt('Ingrese el ID del usuario a editar:');
      if (userId) {
        try {
          const response = await fetch(`/users/${userId}`);
          const user = await response.json();
          document.getElementById('user-id').value = user.id;
          document.getElementById('user-name').value = user.name;
          document.getElementById('user-email').value = user.email;
          document.getElementById('user-role').value = user.role;
          displayForm('user-form');
        } catch (error) {
          console.error('Error fetching user:', error);
          alert('Error al obtener el usuario');
        }
      }
    });
  
    document.getElementById('delete-user').addEventListener('click', async () => {
      const userId = prompt('Ingrese el ID del usuario a eliminar:');
      if (userId) {
        try {
          const response = await fetch(`/users/${userId}`, { method: 'DELETE' });
          if (response.ok) {
            alert('Usuario eliminado con éxito');
          } else {
            alert('Error al eliminar el usuario');
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Error al eliminar el usuario');
        }
      }
    });
  
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userId = document.getElementById('user-id').value;
      const userData = {
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        password: document.getElementById('user-password').value,
        role: document.getElementById('user-role').value
      };
      try {
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `/users/${userId}` : '/users';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (response.ok) {
          alert(userId ? 'Usuario actualizado con éxito' : 'Usuario agregado con éxito');
          userForm.reset();
          displayForm('');
        } else {
          alert('Error al guardar el usuario');
        }
      } catch (error) {
        console.error('Error saving user:', error);
        alert('Error al guardar el usuario');
      }
    });
  
    // Loans
    document.getElementById('add-loan').addEventListener('click', () => {
      loanForm.reset();
      document.getElementById('loan-id').value = '';
      displayForm('loan-form');
    });
  
    document.getElementById('edit-loan').addEventListener('click', async () => {
      const loanId = prompt('Ingrese el ID del préstamo a editar:');
      if (loanId) {
        try {
          const response = await fetch(`/loans/${loanId}`);
          const loan = await response.json();
          document.getElementById('loan-id').value = loan.id;
          document.getElementById('loan-user').value = loan.userId;
          document.getElementById('loan-book').value = loan.bookId;
          document.getElementById('loan-date').value = loan.loanDate.split('T')[0];
          document.getElementById('loan-return-date').value = loan.returnDate.split('T')[0];
          displayForm('loan-form');
        } catch (error) {
          console.error('Error fetching loan:', error);
          alert('Error al obtener el préstamo');
        }
      }
    });
  
    loanForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const loanId = document.getElementById('loan-id').value;
      const loanData = {
        userId: document.getElementById('loan-user').value,
        bookId: document.getElementById('loan-book').value,
        loanDate: document.getElementById('loan-date').value,
        returnDate: document.getElementById('loan-return-date').value
      };
      try {
        const method = loanId ? 'PUT' : 'POST';
        const url = loanId ? `/loans/${loanId}` : '/loans';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loanData)
        });
        if (response.ok) {
          alert(loanId ? 'Préstamo actualizado con éxito' : 'Préstamo agregado con éxito');
          loanForm.reset();
          displayForm('');
        } else {
          alert('Error al guardar el préstamo');
        }
      } catch (error) {
        console.error('Error saving loan:', error);
        alert('Error al guardar el préstamo');
      }
    });
  
    // Backups
    document.getElementById('view-backups').addEventListener('click', async () => {
      try {
        const response = await fetch('/backups');
        const backups = await response.json();
        backupsList.innerHTML = '';
        backups.forEach(backup => {
          const item = document.createElement('li');
          item.textContent = backup;
          backupsList.appendChild(item);
        });
        backupsList.style.display = 'block';
      } catch (error) {
        console.error('Error fetching backups:', error);
        alert('Error al obtener la lista de copias de seguridad');
      }
    });
  
    document.getElementById('generate-backup').addEventListener('click', async () => {
      try {
        const response = await fetch('/backups/generate', { method: 'POST' });
        if (response.ok) {
          alert('Copia de seguridad generada con éxito');
        } else {
          alert('Error al generar la copia de seguridad');
        }
      } catch (error) {
        console.error('Error generating backup:', error);
        alert('Error al generar la copia de seguridad');
      }
    });
  

  // Search functionality
  searchBtn.addEventListener('click', async () => {
    const type = searchType.value;
    const query = searchInput.value.trim();

    if (!type || !query) {
      alert('Por favor, seleccione un tipo de búsqueda y ingrese un valor');
      return;
    }

    try {
      let url;
      switch (type) {
        case 'libro':
          url = `/books/search?title=${encodeURIComponent(query)}`;
          break;
        case 'usuario':
          url = `/users/search?name=${encodeURIComponent(query)}`;
          break;
        case 'autor':
          url = `/authors/search?name=${encodeURIComponent(query)}`;
          break;
        case 'prestamo':
          url = `/loans/search?date=${encodeURIComponent(query)}`;
          break;
      }

      const response = await fetch(url);
      const results = await response.json();
      
      // Display results (you'll need to implement this function)
      displaySearchResults(results, type);
    } catch (error) {
      console.error('Error searching:', error);
      alert('Error al realizar la búsqueda');
    }
  });

  function displaySearchResults(results, type) {
    const searchResultsSection = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
  
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
      const table = document.createElement('table');
      table.innerHTML = '<thead><tr></tr></thead><tbody></tbody>';
      const headerRow = table.querySelector('thead tr');
      const tbody = table.querySelector('tbody');
  
      // Crear encabezados de tabla basados en las claves del primer resultado
      Object.keys(results[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalizar primera letra
        headerRow.appendChild(th);
      });
  
      // Llenar la tabla con los resultados
      results.forEach(result => {
        const row = document.createElement('tr');
        Object.values(result).forEach(value => {
          const td = document.createElement('td');
          td.textContent = value;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
  
      resultsContainer.appendChild(table);
    }
  
    searchResultsSection.style.display = 'block';
  }

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
      // Implementa la lógica de cierre de sesión aquí
      // Por ejemplo, eliminar el token de sesión y redirigir a la página de inicio de sesión
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    });
  });