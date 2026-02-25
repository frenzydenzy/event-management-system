const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) return res.status(401).json("No token");

      const decoded = jwt.verify(token, "secret123");

      // role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json("Forbidden");
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json("Invalid token");
    }
  };
};

module.exports = auth;