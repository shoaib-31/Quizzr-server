const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  correctQuestions: {
    type: Number,
    default: 0,
  },
  correctMarks: {
    type: Number,
    default: 4,
  },
  totalQues: {
    type: Number,
    required: true,
  },
  wrongQuestions: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  dateCompleted: {
    type: Date,
    default: Date.now,
  },
});

const Results = mongoose.model("Results", resultsSchema);

module.exports = Results;
