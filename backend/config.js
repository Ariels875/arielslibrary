import mysql from 'mysql2/promise';

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'toor',
        database: 'currentDB',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  getPool() {
    return this.pool;
  }
}

const instance = new Database();
Object.freeze(instance);

export default instance;
