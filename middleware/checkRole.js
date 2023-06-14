const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const role = req.user.role; // Extract the user's role from the decoded token payload

    if (role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

module.exports = checkRole;