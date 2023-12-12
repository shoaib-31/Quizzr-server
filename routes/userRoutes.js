const express = require("express");
const { updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.patch("/", updateUser).delete("/", deleteUser);

module.exports = router;
