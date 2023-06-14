const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

const validateToken = (req, res, next) => {
  // Extract the JWT token from the Authorization header

  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const [bearer, token] = authorizationHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format or no token' });
    }
    const decoded = jwt.verify(token, config.jwt_secret_key); // Verify and decode the token using the secret key
    req.user = decoded; // Store the decoded payload in the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token'});
  }
};
module.exports = validateToken;