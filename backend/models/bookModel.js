import db from '../config';

const Book = {
  getAll: (offset, limit) => db.query('SELECT * FROM books LIMIT ?, ?', [offset, limit]),
  search: (query) => db.query('SELECT * FROM books WHERE title LIKE ?', [`%${query}%`]),
  create: (data) => db.query('INSERT INTO books SET ?', data),
  update: (id, data) => db.query('UPDATE books SET ? WHERE id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM books WHERE id = ?', [id])
};

export { Book };
