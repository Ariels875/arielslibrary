import db from '../config.js';

const Book = {
  getAll: () => db.query('SELECT * FROM books'),
  getById: (id) => db.query('SELECT * FROM books WHERE id = ?', [id]),
  create: (data) => db.query('INSERT INTO books SET ?', data),
  update: (id, data) => db.query('UPDATE books SET ? WHERE id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM books WHERE id = ?', [id])
};

export default Book;
