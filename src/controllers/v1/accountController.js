import jwt from 'jsonwebtoken';

class AccountController {
  constructor() {

  }

  /**
   *  Login Controller
   *
   * @param {Request} res
   * @param {Response} req 
   * @returns {void}
   */
  login(req, res) {
    const { username } = req.body || {};

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
   * @param {Request} res
   * @param {Response} req
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
