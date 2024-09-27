import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

class AccountController {
  constructor() {
    this.user = new User();
  }

  /**
   * Create account controller
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   *
   */
  async create(req, res) {
    const { username, password, fullname } = req.body || {};

    const response = await this.user.create(username, password, fullname);

    res.json({
      success: true,
      data: {
        recordIndex: response?.insertId
      },
    });
    res.end();
  }

  /**
   *  Login Controller
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   */
  async login(req, res) {
    const { username, password } = req.body || {};

    const result = await this.user.verify(username, password);

    if (!result?.id) {
      return res.json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    res.json({
      success: true,
      data: {
        token: jwt.sign({ 'username': username }, process.env.API_SECRET_KEY, {
          expiresIn: '1d',
        }),
      }
    });
    res.end();
  }

  /**
   * Get user profile
   *
   * @todo Update this to pull from database
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {void}
   *
   */
  profile(req, res) {
    res.json({
      success: true,
      data: {
        username: res.locals.username,
        fullname: 'Juan Tamad',
      }
    })
  }
}

export default AccountController;
