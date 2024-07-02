import db from '../config.js';

const User = {
  getAll: () => db.query('SELECT * FROM users'),
  getById: (id) => db.query('SELECT * FROM users WHERE id = ?', [id]),
  create: (data) => db.query('INSERT INTO users SET ?', data),
  update: (id, data) => db.query('UPDATE users SET ? WHERE id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM users WHERE id = ?', [id]),
  findByEmail: (email) => db.query('SELECT * FROM users WHERE email = ?', [email])
};

export default User;
