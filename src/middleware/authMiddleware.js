// middleware/authMiddleware.js

const ROLES = require("../constants/roles");

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = { authorize };
