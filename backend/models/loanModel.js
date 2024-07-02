import db from '../config.js';

const Loan = {
  getAll: () => db.pool.query('SELECT * FROM prestamos'),
  getById: (id) => db.pool.query('SELECT * FROM prestamos WHERE ID = ?', [id]),
  create: (data) => db.pool.query('INSERT INTO prestamos SET ?', data),
  update: (id, data) => db.pool.query('UPDATE prestamos SET ? WHERE ID = ?', [data, id]),
  delete: (id) => db.pool.query('DELETE FROM prestamos WHERE ID = ?', [id]),
  getAvailableBooks: () => db.pool.query('SELECT * FROM libros WHERE Cantidad > 0')
};

export default Loan;