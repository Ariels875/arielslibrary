import db from '../config.js';

const Loan = {
  getAll: () => db.query('SELECT * FROM loans'),
  getById: (id) => db.query('SELECT * FROM loans WHERE id = ?', [id]),
  create: (data) => db.query('INSERT INTO loans SET ?', data),
  update: (id, data) => db.query('UPDATE loans SET ? WHERE id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM loans WHERE id = ?', [id]),
  getAvailableBooks: () => db.query('SELECT * FROM books WHERE copies_available > 0')
};

export default Loan;
