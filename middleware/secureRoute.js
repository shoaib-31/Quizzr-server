const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.redirect("/login");
  }
};

module.exports = verifyToken;
