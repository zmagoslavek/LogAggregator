const bcrypt = require('bcrypt');
const passport = require('passport');



class AuthController {
  static async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ error: info.message });
      }

      // Save user information in the session
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.json({ user });
      });
    })(req, res, next);
  }
}

module.exports = AuthController;
