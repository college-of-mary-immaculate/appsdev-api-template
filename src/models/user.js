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
      console.error('<error> user.create', err);
      throw err;
    }
  }

  /**
   * Verify if account exists
   *
   * @param {string} username 
   * @param {string} password
   * @returns {Object}
   * @throws {Error}
   */
  async verify(username, password) {
    try {
      const [results,] = await connection.execute(
        'SELECT id, username, fullname FROM users WHERE username = ? AND password = ?',
        [username, encryptPassword(password)],
      )

      return results?.[0];
    } catch (err) {
      console.error('<error> user.verify', err);
      throw err;
    }
  }

  /**
   * Get user's information
   *
   * @param {string} username 
   * @returns {Object}
   * @throws {Error}
   *
   */
  async get(username) {
    try {
      const [results,] = await connection.execute(
        'SELECT fullname FROM users WHERE username = ?',
        [username]
      )

      return results?.[0];
    } catch (err) {
      console.error('<error> user.getInformation', err);
      throw err;
    }
  }
}

export default User;

