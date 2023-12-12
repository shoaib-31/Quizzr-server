const express = require("express");
const router = express.Router();
const {
  getAllResults,
  getResult,
  submitQuiz,
} = require("../controllers/resultController");

router
  .get("/getAllResults", getAllResults)
  .get("/getResult/:id", getResult)
  .post("/submitQuiz/:id", submitQuiz);

module.exports = router;
