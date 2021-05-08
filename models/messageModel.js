const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: timeToString,
  },
  text: String,
  isUser: {
    type: Boolean,
    default: true,
  },
  options: [Object],
});

function timeToString() {
  var today = new Date();
  return today.getHours() + ":" + today.getMinutes();
}

module.exports = MessageSchema;
