// environment variables
require("dotenv").config();

// load libraries
const express = require("express");

// load files
const connectDB = require("./db/dbController");
const indexRouter = require("./routes/userRouter");
const youtubeRouter = require("./routes/youtubeRouter");
// create app instance of express
const app = express();

// bind app to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bind app instance to router
app.use("/users/", indexRouter);
app.use("/youtube/", youtubeRouter);

// connect to DB
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
