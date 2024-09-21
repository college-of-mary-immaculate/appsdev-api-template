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
    const { username, password } = req.body || {};

    res.json({
      username,
      password,
    });
    res.end();
  }
}

export default AccountController;
