import mysql from 'mysql2/promise';

class Database {
  constructor() {
    if (!Database.db) {
      this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'toor', // Asegúrate de usar la contraseña correcta
        database: 'biblioteca', // Nombre de la base de datos en tu archivo SQL
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      Database.db = this;
    }

    return Database.db;
  }

  getPool() {
    return this.pool;
  }
}

const db = new Database();
Object.freeze(db);

export default db;