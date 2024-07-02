import db from '../config.js';

const Author = {
  getAll: () => db.query('SELECT * FROM authors'),
  getById: (id) => db.query('SELECT * FROM authors WHERE id = ?', [id]),
  create: (data) => db.query('INSERT INTO authors SET ?', data),
  update: (id, data) => db.query('UPDATE authors SET ? WHERE id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM authors WHERE id = ?', [id])
};

export default Author;
