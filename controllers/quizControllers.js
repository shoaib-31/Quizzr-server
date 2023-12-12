const Quiz = require("../models/quiz");
const User = require("../models/user");

const getInstructions = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const { instructions, duration, correctMarks, wrongMarks, totalQues } =
      quiz;
    res.json({ instructions, duration, correctMarks, wrongMarks, totalQues });
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
      _id: quiz._id,
      createdDate: quiz.createdDate,
    }));
    res.json(simplifiedQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getCreatedQuiz = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    const author = user.name;
    const quizzes = await Quiz.find({ author });
    const simplifiedQuizzes = quizzes.map((quiz) => ({
      title: quiz.title,
      author: quiz.author,
      _id: quiz._id,
      createdDate: quiz.createdDate,
    }));
    res.json(simplifiedQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postQuiz = async (req, res) => {
  const userId = req.user;
  try {
    const authorUser = await User.findById(userId);
    const author = authorUser.name;

    const {
      title,
      instructions,
      duration,
      correctMarks,
      wrongMarks,
      questions,
    } = req.body;
    const totalQues = questions.length;

    const newQuiz = new Quiz({
      title,
      instructions,
      duration,
      correctMarks,
      wrongMarks,
      author,
      totalQues,
      questions,
    });
    await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { totalQuizCreated: 1 } }
    );
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
  getCreatedQuiz,
};
