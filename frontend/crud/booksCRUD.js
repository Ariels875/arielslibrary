export function initializeBookFunctions(updateBookForm, addBookForm, displayForm) {

  document.getElementById('add-book').addEventListener('click', () => {
    console.log('Botón Agregar Libro clickeado');
    if (addBookForm) {
      addBookForm.reset();
      displayForm('add-book-form');
    } else {
      console.error('No se encontró el formulario de agregar libro');
    }
  });

  document.getElementById('edit-book').addEventListener('click', async () => {
    const ISBN = prompt('Ingrese el ISBN del libro a editar:');
    if (ISBN) {
      try {
        const response = await fetch(`/books/${ISBN}`);
        const book = await response.json();
        document.getElementById('update-book-ISBN').value = book.ISBN;
        document.getElementById('update-book-title').value = book.Titulo;
        document.getElementById('update-book-author').value = book.Autor_id;
        document.getElementById('update-book-year').value = book.Anio_publicacion;
        document.getElementById('update-book-genre').value = book.Genero;
        document.getElementById('update-book-description').value = book.Descripcion;
        document.getElementById('update-book-cover-url').value = book.URLPortada;
        displayForm('update-book-form');
      } catch (error) {
        console.error('Error fetching book:', error);
        alert('Error al obtener el libro');
      }
    }
  });

  addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookData = {
      ISBN: document.getElementById('add-book-ISBN').value,
      Titulo: document.getElementById('add-book-title').value,
      Autor_id: document.getElementById('add-book-author').value,
      Anio_publicacion: document.getElementById('add-book-year').value,
      Genero: document.getElementById('add-book-genre').value,
      Descripcion: document.getElementById('add-book-description').value,
      URLPortada: document.getElementById('add-book-cover-url').value
    };
    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (response.ok) {
        alert('Libro agregado con éxito');
        addBookForm.reset();
        displayForm('');
      } else {
        alert('Error al guardar el libro');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Error al guardar el libro');
    }
  });

  updateBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ISBN = document.getElementById('update-book-ISBN').value;
    const bookData = {
      Titulo: document.getElementById('update-book-title').value,
      Autor_id: document.getElementById('update-book-author').value,
      Anio_publicacion: document.getElementById('update-book-year').value,
      Genero: document.getElementById('update-book-genre').value,
      Descripcion: document.getElementById('update-book-description').value,
      URLPortada: document.getElementById('update-book-cover-url').value
    };
    try {
      const response = await fetch(`/books/${ISBN}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (response.ok) {
        alert('Libro actualizado con éxito');
        updateBookForm.reset();
        displayForm('');
      } else {
        alert('Error al actualizar el libro');
      }
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error al actualizar el libro');
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
}

