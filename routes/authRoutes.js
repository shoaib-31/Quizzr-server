const express = require("express");
const { login, signup, getUser } = require("../controllers/authControllers");
const verifyToken = require("../middleware/secureRoute");
const router = express.Router();

router
  .post("/login", login)
  .post("/signup", signup)
  .get("/getUser", verifyToken, getUser);

module.exports = router;
