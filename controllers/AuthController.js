const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.idUsers, role:user.role, username:user.username }, config.jwt_secret_key, { expiresIn: '1h' });
      return res.json({ token,username:user.username,role:user.role });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthController;