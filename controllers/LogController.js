const Log = require('../models/Log'); // Replace with your Log and Project model imports

class LogController {
  static async addLog(req, res) {
    try {
      // Extract the log details from the request body
      const severity_level = req.body.severity_level;
      const info = req.body.info;
      const projectId = req.params.projectId
      
      const userId = req.user.idUsers;

      if (!userId) {
          return res.status(400).json({ error: 'User is required' });
      }
      
      // Check if all required fields are provided
      if (!projectId || !severity_level || !info) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Create the log using the Log model
      const log = await Log.create({
        projectId,
        severity_level,
        info
      });

      // Respond with the created log
      res.status(201).json({
        message: 'Log added successfully',
        log
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = LogController;
