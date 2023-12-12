const Results = require("../models/results");
const Quiz = require("../models/quiz");
const User = require("../models/user");

const submitQuiz = async (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body;
  const userId = req.user;
  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const correctAnswers = quiz.questions.map(
      (question) => question.options.find((option) => option.isCorrect).option
    );

    let correctQuestions = 0;
    let wrongQuestions = 0;

    answers.forEach((submittedAnswer, index) => {
      const correctAnswer = correctAnswers[index];
      if (submittedAnswer === null) {
      } else if (submittedAnswer === correctAnswer) {
        correctQuestions++;
      } else {
        wrongQuestions++;
      }
    });

    const totalMarks =
      correctQuestions * quiz.correctMarks + wrongQuestions * quiz.wrongMarks;
    const results = {
      quizId: quizId,
      userId: userId,
      correctQuestions: correctQuestions,
      wrongQuestions: wrongQuestions,
      totalMarks: totalMarks,
      correctMarks: quiz.correctMarks,
      totalQues: quiz.totalQues,
    };

    const savedResults = await Results.create(results);
    await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { totalQuizGiven: 1 } }
    );

    res.json({
      message: "Quiz submitted successfully!",
      results: savedResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getResult = async (req, res) => {
  try {
    const resultId = req.params.id;
    const result = await Results.findById(resultId);

    if (!result) {
      return res.status(404).json({ message: "Result not found." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllResults = async (req, res) => {
  try {
    const userId = req.user;

    const results = await Results.find({ userId });

    const resultsInfo = await Promise.all(
      results.map(async (result) => {
        const quiz = await Quiz.findById(result.quizId);
        return {
          title: quiz.title,
          _id: quiz._id,
          author: quiz.author,
          dateCompleted: result.dateCompleted,
          resultId: result._id,
        };
      })
    );

    res.json(resultsInfo);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitQuiz,
  getResult,
  getAllResults,
};
