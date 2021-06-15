// environment variables
require("dotenv").config();

// load libraries
const express = require("express");

const app = express();

// bind app to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(process.env.PORT, () => {
  console.log(`+ Running on Port ${process.env.PORT}`);
});
