// environment variables
require("dotenv").config();

// load libraries
const express = require("express");

// load files
const connectDB=require('./db/dbController');

const app = express();

// bind app to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to DB
connectDB(); 


app.listen(process.env.PORT, () => {
  console.log(`Running on Port ${process.env.PORT}`);
});
