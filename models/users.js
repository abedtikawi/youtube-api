const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    youtube_channel_id: { type: String, unique: true },
    isAvailable: { type: Boolean, default: true },
    refreshTokens: [{ type: String, _id: false }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', usersSchema);
