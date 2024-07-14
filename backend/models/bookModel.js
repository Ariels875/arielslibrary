import db from '../config.js';

const Book = {
  getAll: (offset = 0, limit = 20, query = '') => {
    let sql = 'SELECT ISBN, Titulo, Autor_id, Anio_publicacion, Genero, Descripcion, URLPortada FROM libros';
    const params = [];
    if (query) {
      sql += ' WHERE Titulo LIKE ? OR Genero LIKE ?';
      params.push(`%${query}%`, `%${query}%`);
    }
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);
    return db.pool.query(sql, params);
  },
  getById: (ISBN) => db.pool.query('SELECT * FROM libros WHERE ISBN = ?', [ISBN]),
  create: (data) => db.pool.query('INSERT INTO libros SET ?', data),
  update: (ISBN, data) => db.pool.query('UPDATE libros SET ? WHERE ISBN = ?', [data, ISBN]),
  delete: (ISBN) => db.pool.query('DELETE FROM libros WHERE ISBN = ?', [ISBN])
};

export default Book;