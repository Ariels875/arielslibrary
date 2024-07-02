import Book from '../models/bookModel';

const getBooks = async (req, res) => {
  try {
    const { offset = 0, limit = 20 } = req.query;
    const [books] = await Book.getAll(Number(offset), Number(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const [books] = await Book.search(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getBooks, searchBooks };
