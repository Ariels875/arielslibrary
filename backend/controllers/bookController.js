import Book from '../models/bookModel.js';

export const getBooks = async (req, res) => {
  try {
    const { offset = 0, limit = 20, query = '' } = req.query;
    const [books] = await Book.getAll(parseInt(offset), parseInt(limit), query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const [books] = await Book.getById(id);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(books[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { ISBN, Titulo, Autor_id, Anio_publicacion, Genero, Descripcion } = req.body;
    const [result] = await Book.create({
      ISBN,
      Titulo,
      Autor_id,
      Anio_publicacion,
      Genero,
      Descripcion,
      URLPortada
    });
    res.json({ success: true, ISBN: ISBN });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { Titulo, Autor_id, Anio_publicacion, Genero, Descripcion } = req.body;
    await Book.update(id, {
      Titulo,
      Autor_id,
      Anio_publicacion,
      Genero,
      Descripcion,
      URLPortada
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};