
export function initializeBookFunctions(bookForm, displayForm) {
    document.getElementById('add-book').addEventListener('click', () => {
      console.log('Botón Agregar Libro clickeado');
      if (bookForm) {
        bookForm.reset();
        displayForm('book-form');
      } else {
        console.error('No se encontró el formulario de libro');
      }
    });
  
    document.getElementById('edit-book').addEventListener('click', async () => {
      const ISBN = prompt('Ingrese el ISBN del libro a editar:');
      if (ISBN) {
        try {
          const response = await fetch(`/books/${ISBN}`);
          const book = await response.json();
          document.getElementById('book-id').value = book.ISBN;
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
      const ISBN = prompt('Ingrese el ID del libro a eliminar:');
      if (ISBN) {
        try {
          const response = await fetch(`/books/${ISBN}`, { method: 'DELETE' });
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
      const ISBN = document.getElementById('book-ISBN').value;
      const bookData = {
        ISBN: ISBN,
        Titulo: document.getElementById('book-title').value,
        Autor_id: document.getElementById('book-author').value,
        Anio_publicacion: document.getElementById('book-year').value,
        Genero: document.getElementById('book-genre').value,
        Descripcion: document.getElementById('book-description').value,
        URLPortada: document.getElementById('book-cover-url').value
      };
      try {
        const method = ISBN ? 'PUT' : 'POST';
        const url = ISBN ? `/books/${ISBN}` : '/books';
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
        });
        if (response.ok) {
          alert(ISBN ? 'Libro actualizado con éxito' : 'Libro agregado con éxito');
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
  }