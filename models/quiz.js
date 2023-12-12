const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  totalQues: { type: Number, required: true },
  duration: { type: Number, required: true },
  instructions: { type: String, required: true },
  correctMarks: { type: Number, required: true },
  wrongMarks: { type: Number, required: true },
  author: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
