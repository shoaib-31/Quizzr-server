const express = require("express");
const router = express.Router();
const {
  getInstructions,
  getQuiz,
  getAllQuiz,
  postQuiz,
} = require("../controllers/quizControllers");

router
  .get("/instructions/:id", getInstructions)
  .get("/quiz/:id", getQuiz)
  .get("/getAllQuiz", getAllQuiz)
  .post("/quiz", postQuiz);

module.exports = router;
