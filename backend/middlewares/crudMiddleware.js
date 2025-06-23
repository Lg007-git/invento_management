const jwt = require("jsonwebtoken");

const crudMiddleware = (req, res, next) => {
  const token = req.headers['x-crud-token']; // separate header for CRUD
  if (!token) return res.status(401).json({ msg: "No CRUD token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.crud) return res.status(403).json({ msg: "Not authorized for CRUD" });

    req.user = decoded; // contains user id and crud flag
    console.log("req.user",req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid CRUD token" });
  }
};

module.exports = crudMiddleware;
