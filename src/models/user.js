import { connection } from '../core/database.js';
import { encryptPassword } from '../utils/hash.js';

class User {
  constructor() {
    this.db = connection;
  }

  /**
   * Create user profile
   *
   * @param {String} username
   * @param {String} password
   * @param {String} fullname 
   *
   * @returns {Object}
   * @throws MySQL2 error
   *
   */
  async create(username, password, fullname) {
    try {
      const [results,] = await connection.execute(
        'INSERT INTO users(username, password, fullname) VALUES (?, ?, ?)',
        [username, encryptPassword(password), fullname],
      );

      return results;
    } catch (err) {
      return err;
    }
  }

  /**
   * Verify if account exists
   *
   * @param {string} username 
   * @param {string} password
   */
  async verify(username, password) {
    try {
      const [results,] = await connection.execute(
        'SELECT id, username, fullname FROM users WHERE username = ? AND password = ?',
        [username, encryptPassword(password)],
      )

      if (results?.[0]) {
        return results[0];
      }

      return null;
    } catch (err) {
      return err;
    }
  }
}

export default User;

