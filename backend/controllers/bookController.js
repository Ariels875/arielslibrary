import Book from '../models/bookModel.js';

export const getBooks = async (req, res) => {
  try {
    const [books] = await Book.getAll();
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
    const { title, author_id, genre, year, copies_available } = req.body;
    const [result] = await Book.create({
      title,
      author_id,
      genre,
      year,
      copies_available
    });
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author_id, genre, year, copies_available } = req.body;
    await Book.update(id, {
      title,
      author_id,
      genre,
      year,
      copies_available
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
