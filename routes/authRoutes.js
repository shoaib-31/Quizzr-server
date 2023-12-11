const express = require("express");
const { login, signup } = require("../controllers/authControllers");
const router = express.Router();

router.post("/login", login).post("/signup", signup);

module.exports = router;
