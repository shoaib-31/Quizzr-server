const Quiz = require("../models/quiz");

const getInstructions = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const { instruction, duration, correctMarks, wrongMarks, totalQues } = quiz;
    res.json({ instruction, duration, correctMarks, wrongMarks, totalQues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const transformedQuiz = quiz.questions.map((q) => {
      return {
        question: q.question,
        options: q.options.map((opt) => opt.option),
      };
    });

    res.json(transformedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const simplifiedQuizzes = quizzes.map((quiz) => ({
      title: quiz.title,
      author: quiz.author,
      quizId: quiz._id,
      createdDate: quiz.createdDate,
    }));
    res.json(simplifiedQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postQuiz = async (req, res) => {
  try {
    const {
      instruction,
      duration,
      correctMarks,
      wrongMarks,
      totalQues,
      questions,
    } = req.body;

    const newQuiz = new Quiz({
      instruction,
      duration,
      correctMarks,
      wrongMarks,
      totalQues,
      questions,
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getInstructions,
  getQuiz,
  getAllQuiz,
  postQuiz,
};
