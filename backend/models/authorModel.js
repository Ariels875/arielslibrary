import db from '../config.js';

const Author = {
  getAll: () => db.pool.query('SELECT * FROM autores'),
  getById: (id) => db.pool.query('SELECT * FROM autores WHERE ID = ?', [id]),
  create: (data) => db.pool.query('INSERT INTO autores SET ?', data),
  update: (id, data) => db.pool.query('UPDATE autores SET ? WHERE ID = ?', [data, id]),
  delete: (id) => db.pool.query('DELETE FROM autores WHERE ID = ?', [id])
};

export default Author;