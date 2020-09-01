const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  user: Number,
  bloodType: String,
  results: {
    type: Object,
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
