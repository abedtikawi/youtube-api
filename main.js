// environment variables
require("dotenv").config();

// load libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// load files and routers
const connectDB = require("./db/dbController");
const indexRouter = require("./routes/userRouter");
const youtubeRouter = require("./routes/youtubeRouter");
const facebookRouter = require("./routes/facebookRouter");

// connect to DB
connectDB();
// create app instance of express
const app = express();

// bind app to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bind app to cors library for cross origin resource sharing
app.use(cors());

// bind app to use cookies
app.use(cookieParser());

// bind app instance to router
app.use("/users/", indexRouter);
app.use("/youtube/", youtubeRouter);
app.use("/facebook/", facebookRouter);

app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
