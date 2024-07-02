import db from '../config.js';

const User = {
  getAll: () => db.pool.query('SELECT * FROM usuarios'),
  getById: (id) => db.pool.query('SELECT * FROM usuarios WHERE ID = ?', [id]),
  create: (data) => db.pool.query('INSERT INTO usuarios SET ?', {
    Nombre: data.name,
    Correo_electronico: data.email,
    Contraseña: data.password,
    Fecha_registro: data.registration_date,
    Rol: data.role
  }),
  update: (id, data) => db.pool.query('UPDATE usuarios SET ? WHERE ID = ?', [data, id]),
  delete: (id) => db.pool.query('DELETE FROM usuarios WHERE ID = ?', [id]),
  findByEmail: (email) => db.pool.query('SELECT * FROM usuarios WHERE Correo_electronico = ?', [email])
};

export default User;