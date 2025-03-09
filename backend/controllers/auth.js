const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(403).json({ error: "No token provided" });
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { verify };
