const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultsRoutes = require("./routes/resultRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyToken = require("./middleware/secureRoute");
const app = express();

dotenv.config();
app.use(cors());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use(verifyToken);
app.use("/quiz", quizRoutes);
app.use("/user", userRoutes);
app.use("/results", resultsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
