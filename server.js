const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultsRoutes = require("./routes/resultsRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.use(express.json());
app.use(verifyToken);

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/results", resultsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
