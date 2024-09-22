import jwt from 'jsonwebtoken';

/**
 * Authentication for logged in users
 *
 * @param {Request} req
 * @param {Response} res
 * @param {VoidFunction} next 
 */
export default function authorization(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    res.json({
      'success': false,
      'message': 'Unauthenticated user',
    });
    return;
  }

  jwt.verify(token, process.env.API_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        'success': false,
        'message': 'Invalid token',
      });
      return;
    }

    res.locals.username = decoded?.username;
    res.locals.authenticated = true;
  });

  next();
}

