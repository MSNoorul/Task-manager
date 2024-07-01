const jwt = require('jsonwebtoken');
const  User  = require('../models/User'); // Example Sequelize User model
const roles = require('../roles'); // Example roles definition

// Middleware to verify JWT token and check roles
const authorize = (requiredRole) => {
  return async (req, res, next) => {
    try {
      // Get user ID from JWT token
      const authHeader = req.headers.authorization || req.headers.Authorization;

      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
      const token = authHeader.split(' ')[1]; // Assuming Bearer token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;

      // Find user in database
      const user = await User.findOne({
        where: {
          username: req.user
        }
      });

      // Check if user exists and has the required role
      if (user && roles[requiredRole].includes(user.role)) {
        next(); // User has the required role, proceed to the next middleware/route handler
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = authorize;
