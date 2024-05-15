const express = require("express");
const app = express();
const db = require("./db.js");
require("dotenv").config();
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const auth = require("./routes/auth");

const authRoutes = require("./routes/auth");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/student", studentRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("This is PLACEMENT CELL App.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
