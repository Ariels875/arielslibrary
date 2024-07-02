import Author from '../models/authorModel.js';

export const getAuthors = async (req, res) => {
  try {
    const [authors] = await Author.getAll();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [authors] = await Author.getById(id);
    if (authors.length === 0) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(authors[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const [result] = await Author.create({
      name,
      bio
    });
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    await Author.update(id, { name, bio });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await Author.delete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
