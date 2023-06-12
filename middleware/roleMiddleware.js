function checkRole(role) {
    return (req, res, next) => {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Check if user has the required role
      if (req.user.role !== role) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      // If the user has the required role, allow access to the route
      next();
    };
  }
  
  module.exports = { checkRole };
  