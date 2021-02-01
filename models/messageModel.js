const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  sender: String,
  read: Boolean,
  threads: [
    {
      date: String,
      time: String,
      text: String,
      user: Boolean,
      options: [String],
    },
  ],
});

module.exports = MessageSchema;
