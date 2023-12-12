const express = require("express");
const router = express.Router();
const {
  getInstructions,
  getQuiz,
  getAllQuiz,
  postQuiz,
  getCreatedQuiz,
} = require("../controllers/quizControllers");

router
  .get("/getAll", getAllQuiz)
  .get("/getCreatedQuiz", getCreatedQuiz)
  .get("/:id", getQuiz)
  .get("/instructions/:id", getInstructions)
  .post("/create", postQuiz);

module.exports = router;
