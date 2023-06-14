const bcrypt = require('bcrypt');
const User = require('../models/User');

class AdminController {
  static async registerUser(req, res) {
    try {
      
      if (!req.body.username) {
        return res.json({error:"No username"});
      }
      if (!req.body.password) {
        return res.json({error:"No password"});
      }
      if (!req.body.role) {
        return res.json({error:"No role"});
      }
      
      
      const username = req.body.username;
      const password = req.body.password;
      const role = req.body.role;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const user = await User.create({ username, password: hashedPassword, role:role });

      res.json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = AdminController;
