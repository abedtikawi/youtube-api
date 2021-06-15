const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
