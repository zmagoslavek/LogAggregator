const bcrypt = require('bcrypt');
const User = require('../models/User');

class AdminController {
  static async registerUser(req, res) {
    try {
      const { username, password, role } = req.body;

      // Check if the user making the request is an admin
      if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Only admin can register new users' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = await User.create({ username, password: hashedPassword, role });

      res.json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AdminController;
