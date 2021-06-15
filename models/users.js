const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", usersSchema);
