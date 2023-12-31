const Log = require('../models/Log');
const Project = require('../models/Project')
const User = require('../models/User')


class UserController {
    
    static async addProject(req, res) {
      try {
        // Extract the project details from the request body
        const name = req.body.name;
        // Retrieve the user ID from the authenticated user in the session
        const userId = req.user.id;
  
        // Check if the name and user are defined
        if (!name) {
          return res.status(400).json({ error: 'Project name is required' });
        }
  
        if (!userId) {
          return res.status(400).json({ error: 'User is required' });
        }
  
        // Create a new project using the Project model
        const project = await Project.create({
          name,
          userId
        });
  
        // Respond with the created project
        res.status(201).json({
          message: 'Project added successfully',
          project
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    static async getAllUserProjects(req, res) {
        try {
          // Retrieve the user ID from the authenticated user in the session
          const userId = req.user.id;

          if (!userId) {
            return res.status(400).json({ error: 'User is required' });
          }

          const projects = await Project.findAll({
            where: {
                userId: userId,
            },
            include:Log
          });
          
          
    
          res.status(200).json({
            message: 'User projects retrieved successfully',
            projects
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getProjectById(req, res) {
        try {
          // Retrieve the user ID from the authenticated user in the session
          const userId = req.user.idUsers;

          if (!userId) {
            return res.status(400).json({ error: 'User is required' });
          }
    
          // Find the user and include their associated projects
          const projects = await Project.findAll({
            where: {
                userId: userId,
                idProjects: req.params.projectId
            },
            include: Log
          });
    
          res.status(200).json({
            message: 'User projects retrieved successfully',
            projects
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = UserController;

