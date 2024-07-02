import db from '../config.js';

const Book = {
  getAll: () => db.pool.query('SELECT * FROM libros'),
  getById: (id) => db.pool.query('SELECT * FROM libros WHERE ISBN = ?', [id]),
  create: (data) => db.pool.query('INSERT INTO libros SET ?', data),
  update: (id, data) => db.pool.query('UPDATE libros SET ? WHERE ISBN = ?', [data, id]),
  delete: (id) => db.pool.query('DELETE FROM libros WHERE ISBN = ?', [id])
};

export default Book;